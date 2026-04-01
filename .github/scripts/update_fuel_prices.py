#!/usr/bin/env python3
"""
Update fuelPrices in script.js from Eurostat EU Weekly Oil Bulletin.

Data source: https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en
Prices are published in EUR/1000L; this script converts them to PLN/L using
monthly average EUR/PLN rates from the ECB SDMX API.
"""

import re
import sys
import textwrap
from io import BytesIO
from pathlib import Path

import requests
import pandas as pd

XLSX_URL = (
    "https://ec.europa.eu/energy/observatory/reports/Oil_Bulletin_Prices_History.xlsx"
)
ECB_URL = (
    "https://data-api.ecb.europa.eu/service/data/EXR/M.PLN.EUR.SP00.A"
    "?format=jsondata&startPeriod=2020-01"
)

SCRIPT_JS = Path(__file__).parent.parent.parent / "script.js"

# Maps our fuel keys to substrings that should appear in the sheet name.
# Listed from most to least specific so the first match wins.
FUEL_SHEET_PATTERNS: dict[str, list[str]] = {
    "Pb95":  ["Euro-Super 95", "Unleaded 95"],
    "Pb98":  ["Premium unleaded 98", "Unleaded 98"],
    "ON":    ["Automotive gas oil", "Gas oil"],
    "LPG":   ["LPG", "Autogas"],
}


# ---------------------------------------------------------------------------
# Download helpers
# ---------------------------------------------------------------------------

def download_xlsx() -> BytesIO:
    print(f"Downloading: {XLSX_URL}")
    r = requests.get(XLSX_URL, timeout=120)
    r.raise_for_status()
    return BytesIO(r.content)


def fetch_ecb_pln_rates() -> dict[str, float]:
    """Return {YYYY-MM: PLN_per_EUR} monthly average rates."""
    print(f"Fetching ECB PLN/EUR rates: {ECB_URL}")
    r = requests.get(ECB_URL, timeout=30)
    r.raise_for_status()
    data = r.json()
    periods = data["structure"]["dimensions"]["observation"][0]["values"]
    obs = list(data["dataSets"][0]["series"].values())[0]["observations"]
    rates: dict[str, float] = {}
    for idx, val in obs.items():
        if val[0] is not None:
            rates[periods[int(idx)]["id"]] = val[0]
    print(f"  Got {len(rates)} monthly rates ({min(rates)} – {max(rates)})")
    return rates


# ---------------------------------------------------------------------------
# Sheet finding & parsing
# ---------------------------------------------------------------------------

def find_sheet_name(xl: pd.ExcelFile, fuel_key: str) -> str | None:
    """Return the first sheet name that matches the fuel type, preferring sheets
    that also contain 'tax' in the name (consumer prices with taxes)."""
    patterns = FUEL_SHEET_PATTERNS[fuel_key]

    def score(name: str) -> int:
        nl = name.lower()
        for i, pat in enumerate(patterns):
            if pat.lower() in nl:
                # Prefer "with taxes" sheets (lower score = better)
                tax_bonus = 0 if "tax" in nl else 100
                return i + tax_bonus
        return 9999

    matches = [(score(s), s) for s in xl.sheet_names if score(s) < 9999]
    if not matches:
        return None
    return min(matches)[1]


def parse_sheet(xl: pd.ExcelFile, sheet: str, pln_rates: dict[str, float]) -> dict[str, float]:
    """Parse a weekly-data sheet and return {YYYY-MM: avg_PLN_per_L}."""
    df = pd.read_excel(xl, sheet_name=sheet, header=None)

    # Find the header row that contains the country code 'PL'
    header_row: int | None = None
    pl_col: int | None = None
    for i, row in df.iterrows():
        row_vals = [str(v).strip() for v in row.values]
        if "PL" in row_vals:
            header_row = i
            pl_col = row_vals.index("PL")
            break

    if header_row is None or pl_col is None:
        print(f"  WARNING: Could not find 'PL' column in sheet '{sheet}'")
        return {}

    monthly: dict[str, list[float]] = {}

    for i in range(header_row + 1, len(df)):
        row = df.iloc[i]
        date_val = row.iloc[0]
        price_raw = row.iloc[pl_col]

        if pd.isna(date_val) or pd.isna(price_raw):
            continue

        # Parse date
        try:
            if hasattr(date_val, "strftime"):
                dt = date_val
            else:
                dt = pd.to_datetime(date_val, dayfirst=True)
            ym = dt.strftime("%Y-%m")
        except Exception:
            continue

        # Price in EUR per 1000 L → EUR per L
        try:
            price_eur_per_l = float(price_raw) / 1000.0
        except (ValueError, TypeError):
            continue

        if price_eur_per_l <= 0:
            continue

        # Find the EUR/PLN rate for this month (fall back to nearest prior month)
        pln_per_eur = pln_rates.get(ym)
        if pln_per_eur is None:
            prior = sorted(m for m in pln_rates if m <= ym)
            if not prior:
                continue
            pln_per_eur = pln_rates[prior[-1]]

        price_pln_per_l = price_eur_per_l * pln_per_eur
        monthly.setdefault(ym, []).append(price_pln_per_l)

    return {ym: round(sum(v) / len(v), 2) for ym, v in sorted(monthly.items())}


# ---------------------------------------------------------------------------
# JS generation
# ---------------------------------------------------------------------------

def format_prices_js(fuel_data: dict[str, dict[str, float]]) -> str:
    """Render the fuelPrices JS object, grouping entries by year (one line each)."""
    fuel_blocks = []
    for fuel_key in ["LPG", "Pb95", "Pb98", "ON"]:
        prices = fuel_data.get(fuel_key)
        if not prices:
            continue
        year_lines = []
        cur_year: str | None = None
        cur_entries: list[str] = []
        for ym, val in sorted(prices.items()):
            y = ym[:4]
            if y != cur_year:
                if cur_entries:
                    year_lines.append("    " + ",".join(cur_entries))
                cur_entries = [f'"{ym}":{val:.2f}']
                cur_year = y
            else:
                cur_entries.append(f'"{ym}":{val:.2f}')
        if cur_entries:
            year_lines.append("    " + ",".join(cur_entries))
        fuel_blocks.append(f'  "{fuel_key}": {{\n' + ",\n".join(year_lines) + "\n  }")

    return "const fuelPrices = {\n" + ",\n".join(fuel_blocks) + "\n};"


# ---------------------------------------------------------------------------
# Update script.js in-place
# ---------------------------------------------------------------------------

def update_script_js(new_prices_js: str) -> bool:
    content = SCRIPT_JS.read_text(encoding="utf-8")
    pattern = re.compile(
        r"// Monthly average.*?^const fuelPrices = \{.*?^\};",
        re.DOTALL | re.MULTILINE,
    )
    replacement = (
        "// Monthly average retail fuel prices in Poland (zł/l),"
        " source: Eurostat EU Weekly Oil Bulletin\n"
        + new_prices_js
    )
    new_content, n = pattern.subn(replacement, content)
    if n == 0:
        print("ERROR: Could not locate fuelPrices block in script.js")
        return False
    if new_content == content:
        print("No changes – fuel prices already up to date.")
        return False
    SCRIPT_JS.write_text(new_content, encoding="utf-8")
    print("script.js updated successfully.")
    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    xlsx_bytes = download_xlsx()
    xl = pd.ExcelFile(xlsx_bytes)
    print(f"Sheets in workbook ({len(xl.sheet_names)}): {xl.sheet_names[:6]} …")

    pln_rates = fetch_ecb_pln_rates()

    fuel_data: dict[str, dict[str, float]] = {}
    for fuel_key in ["Pb95", "Pb98", "ON", "LPG"]:
        sheet = find_sheet_name(xl, fuel_key)
        if sheet is None:
            print(f"WARNING: No matching sheet for {fuel_key} – skipping")
            continue
        print(f"Parsing {fuel_key} from sheet '{sheet}' …")
        prices = parse_sheet(xl, sheet, pln_rates)
        if prices:
            fuel_data[fuel_key] = prices
            print(f"  {len(prices)} months: {min(prices)} – {max(prices)}")
        else:
            print(f"  WARNING: No usable data for {fuel_key}")

    if not fuel_data:
        print("ERROR: No fuel data could be parsed – aborting.")
        sys.exit(1)

    new_js = format_prices_js(fuel_data)
    update_script_js(new_js)


if __name__ == "__main__":
    main()
