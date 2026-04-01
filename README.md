# ⛽ Kalkulator Prędkości Dochodowej

Strona internetowa (single-page application) obliczająca prędkość, przy której koszt paliwa na godzinę jest równy podanej stawce zarobkowej użytkownika.

## 🚀 Demo

Dostępne na [GitHub Pages](https://wereduk.github.io/income-speed/).

## 🧮 Wzór obliczeń

```
Koszt na km  = (średnie_spalanie / 100) × cena_paliwa_za_litr
Prędkość     = stawka_zarobkowa / koszt_na_km
```

**Przykład:**
- Stawka: **30 zł/h**, Spalanie: **7 l/100km**, Pb95 2023 (**6,35 zł/l**)
- Koszt/km = (7/100) × 6,35 = **0,4445 zł/km**
- Prędkość = 30 / 0,4445 ≈ **67,5 km/h**

## ✨ Funkcje

- **4 rodzaje paliw** z historycznymi cenami 2020–2025: LPG, Pb95, Pb98, ON
- **Live calculation** — wynik aktualizuje się automatycznie przy każdej zmianie
- **Wykres liniowy** (Chart.js) — wizualizacja prędkości dochodowej w kolejnych latach
- **Cena ręczna** — opcjonalne pole nadpisujące cenę historyczną
- **Responsywny design** — działa poprawnie na urządzeniach mobilnych i desktopach

## 📁 Struktura plików

| Plik | Opis |
|---|---|
| `index.html` | Główna strona HTML z formularzem, wynikiem i wykresem |
| `style.css` | Nowoczesne style z gradientami, cieniami i kartami |
| `script.js` | Logika obliczeń + wbudowane historyczne ceny paliw |
| `README.md` | Dokumentacja projektu |

## 📊 Historyczne ceny paliw (Polska, średnie roczne)

| Rok  | LPG   | Pb95  | Pb98  | ON    |
|------|-------|-------|-------|-------|
| 2020 | 1,89  | 4,47  | 4,84  | 4,52  |
| 2021 | 2,30  | 5,53  | 5,91  | 5,56  |
| 2022 | 3,14  | 6,98  | 7,42  | 7,58  |
| 2023 | 2,78  | 6,35  | 6,82  | 6,56  |
| 2024 | 2,85  | 6,40  | 6,90  | 6,60  |
| 2025 | 2,90  | 6,50  | 7,00  | 6,70  |

## 🛠️ Uruchomienie lokalnie

Wystarczy otworzyć plik `index.html` w przeglądarce — brak zależności serwerowych.

```bash
git clone https://github.com/wereduk/income-speed.git
cd income-speed
# Otwórz index.html w przeglądarce
```

## 📄 Licencja

MIT