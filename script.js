// Monthly average retail fuel prices in Poland (zł/l), source: Eurostat EU Weekly Oil Bulletin
const fuelPrices = {
  "LPG": {
    "2020-01":1.95,"2020-02":1.94,"2020-03":1.80,"2020-04":1.68,"2020-05":1.63,"2020-06":1.69,
    "2020-07":1.72,"2020-08":1.75,"2020-09":1.77,"2020-10":1.74,"2020-11":1.71,"2020-12":1.73,
    "2021-01":1.74,"2021-02":1.79,"2021-03":1.86,"2021-04":1.97,"2021-05":2.08,"2021-06":2.19,
    "2021-07":2.29,"2021-08":2.36,"2021-09":2.38,"2021-10":2.49,"2021-11":2.54,"2021-12":2.63,
    "2022-01":2.67,"2022-02":2.73,"2022-03":3.37,"2022-04":3.64,"2022-05":3.38,"2022-06":3.48,
    "2022-07":3.44,"2022-08":3.24,"2022-09":3.27,"2022-10":3.40,"2022-11":3.25,"2022-12":3.17,
    "2023-01":3.17,"2023-02":3.10,"2023-03":2.98,"2023-04":2.83,"2023-05":2.67,"2023-06":2.63,
    "2023-07":2.66,"2023-08":2.74,"2023-09":2.90,"2023-10":2.84,"2023-11":2.71,"2023-12":2.64,
    "2024-01":2.63,"2024-02":2.66,"2024-03":2.77,"2024-04":2.87,"2024-05":2.89,"2024-06":2.87,
    "2024-07":2.86,"2024-08":2.85,"2024-09":2.80,"2024-10":2.83,"2024-11":2.87,"2024-12":2.88,
    "2025-01":2.83,"2025-02":2.80,"2025-03":2.75,"2025-04":2.70,"2025-05":2.70,"2025-06":2.73,
    "2025-07":2.76,"2025-08":2.78,"2025-09":2.77,"2025-10":2.75,"2025-11":2.72,"2025-12":2.70,
    "2026-01":2.67,"2026-02":2.64,"2026-03":2.62
  },
  "Pb95": {
    "2020-01":4.57,"2020-02":4.54,"2020-03":4.06,"2020-04":3.68,"2020-05":3.61,"2020-06":3.79,
    "2020-07":3.90,"2020-08":3.98,"2020-09":4.07,"2020-10":4.02,"2020-11":3.95,"2020-12":4.02,
    "2021-01":4.01,"2021-02":4.13,"2021-03":4.30,"2021-04":4.51,"2021-05":4.68,"2021-06":4.87,
    "2021-07":5.06,"2021-08":5.19,"2021-09":5.25,"2021-10":5.47,"2021-11":5.60,"2021-12":5.78,
    "2022-01":5.86,"2022-02":5.95,"2022-03":6.80,"2022-04":7.09,"2022-05":6.89,"2022-06":7.10,
    "2022-07":7.08,"2022-08":6.83,"2022-09":6.79,"2022-10":6.90,"2022-11":6.66,"2022-12":6.55,
    "2023-01":6.56,"2023-02":6.48,"2023-03":6.35,"2023-04":6.15,"2023-05":5.87,"2023-06":5.80,
    "2023-07":5.86,"2023-08":6.06,"2023-09":6.42,"2023-10":6.33,"2023-11":6.07,"2023-12":5.92,
    "2024-01":5.98,"2024-02":6.03,"2024-03":6.24,"2024-04":6.38,"2024-05":6.35,"2024-06":6.31,
    "2024-07":6.29,"2024-08":6.24,"2024-09":6.11,"2024-10":6.19,"2024-11":6.28,"2024-12":6.30,
    "2025-01":6.18,"2025-02":6.10,"2025-03":6.01,"2025-04":5.94,"2025-05":5.93,"2025-06":5.99,
    "2025-07":6.05,"2025-08":6.08,"2025-09":6.12,"2025-10":6.10,"2025-11":6.07,"2025-12":6.08,
    "2026-01":5.95,"2026-02":5.88,"2026-03":5.84
  },
  "Pb98": {
    "2020-01":4.93,"2020-02":4.90,"2020-03":4.42,"2020-04":4.03,"2020-05":3.97,"2020-06":4.15,
    "2020-07":4.27,"2020-08":4.34,"2020-09":4.42,"2020-10":4.38,"2020-11":4.31,"2020-12":4.37,
    "2021-01":4.37,"2021-02":4.49,"2021-03":4.66,"2021-04":4.87,"2021-05":5.04,"2021-06":5.23,
    "2021-07":5.42,"2021-08":5.56,"2021-09":5.62,"2021-10":5.84,"2021-11":5.97,"2021-12":6.15,
    "2022-01":6.23,"2022-02":6.32,"2022-03":7.23,"2022-04":7.52,"2022-05":7.35,"2022-06":7.57,
    "2022-07":7.55,"2022-08":7.30,"2022-09":7.26,"2022-10":7.36,"2022-11":7.12,"2022-12":7.01,
    "2023-01":7.01,"2023-02":6.93,"2023-03":6.80,"2023-04":6.60,"2023-05":6.31,"2023-06":6.24,
    "2023-07":6.30,"2023-08":6.50,"2023-09":6.88,"2023-10":6.78,"2023-11":6.52,"2023-12":6.36,
    "2024-01":6.42,"2024-02":6.48,"2024-03":6.69,"2024-04":6.84,"2024-05":6.81,"2024-06":6.77,
    "2024-07":6.75,"2024-08":6.69,"2024-09":6.56,"2024-10":6.64,"2024-11":6.73,"2024-12":6.75,
    "2025-01":6.62,"2025-02":6.54,"2025-03":6.44,"2025-04":6.37,"2025-05":6.35,"2025-06":6.41,
    "2025-07":6.47,"2025-08":6.50,"2025-09":6.54,"2025-10":6.52,"2025-11":6.49,"2025-12":6.50,
    "2026-01":6.37,"2026-02":6.30,"2026-03":6.26
  },
  "ON": {
    "2020-01":4.84,"2020-02":4.77,"2020-03":4.30,"2020-04":3.88,"2020-05":3.75,"2020-06":3.87,
    "2020-07":3.94,"2020-08":4.01,"2020-09":4.07,"2020-10":4.00,"2020-11":3.92,"2020-12":3.98,
    "2021-01":3.97,"2021-02":4.05,"2021-03":4.21,"2021-04":4.35,"2021-05":4.47,"2021-06":4.69,
    "2021-07":4.90,"2021-08":5.07,"2021-09":5.12,"2021-10":5.34,"2021-11":5.47,"2021-12":5.70,
    "2022-01":5.78,"2022-02":5.83,"2022-03":7.26,"2022-04":7.63,"2022-05":7.36,"2022-06":7.99,
    "2022-07":7.84,"2022-08":7.42,"2022-09":7.44,"2022-10":7.54,"2022-11":7.27,"2022-12":7.18,
    "2023-01":7.19,"2023-02":7.12,"2023-03":6.98,"2023-04":6.70,"2023-05":6.44,"2023-06":6.25,
    "2023-07":6.25,"2023-08":6.38,"2023-09":6.71,"2023-10":6.59,"2023-11":6.34,"2023-12":6.17,
    "2024-01":6.15,"2024-02":6.17,"2024-03":6.35,"2024-04":6.52,"2024-05":6.56,"2024-06":6.52,
    "2024-07":6.50,"2024-08":6.49,"2024-09":6.36,"2024-10":6.44,"2024-11":6.52,"2024-12":6.54,
    "2025-01":6.42,"2025-02":6.35,"2025-03":6.23,"2025-04":6.10,"2025-05":6.08,"2025-06":6.12,
    "2025-07":6.15,"2025-08":6.20,"2025-09":6.18,"2025-10":6.14,"2025-11":6.08,"2025-12":5.98,
    "2026-01":5.92,"2026-02":5.88,"2026-03":5.85
  }
};

const MONTH_NAMES = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
  'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
];
const MONTH_SHORT = ['sty','lut','mar','kwi','maj','cze','lip','sie','wrz','paź','lis','gru'];

// --- ECB exchange rates ---
// ecbRates[currency]['YYYY-MM'] = units of currency per 1 EUR
// e.g. ecbRates['PLN']['2023-06'] = 4.47  (4.47 PLN = 1 EUR)
let ecbRates = null; // null = not yet fetched; {} = fetch failed

async function fetchECBRates() {
  const statusEl = document.getElementById('ratesStatus');
  if (statusEl) statusEl.textContent = 'Pobieranie kursów walut…';
  try {
    const ccys = 'PLN+USD+GBP+CHF+CZK+SEK+NOK';
    const url =
      `https://data-api.ecb.europa.eu/service/data/EXR/M.${ccys}.EUR.SP00.A` +
      `?format=jsondata&startPeriod=2020-01`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const json = await resp.json();
    ecbRates = parseECBRates(json);
    if (statusEl) statusEl.textContent = '';
  } catch (e) {
    console.warn('ECB rates unavailable:', e);
    ecbRates = {};
    if (statusEl) statusEl.textContent = '⚠️ Kursy walut niedostępne';
  }
  calculate();
}

function parseECBRates(json) {
  const result = {};
  const seriesDims = json.structure.dimensions.series;
  const ccyDim = seriesDims.find(d => d.id === 'CURRENCY');
  const ccyIdx = seriesDims.indexOf(ccyDim);
  const periods = json.structure.dimensions.observation[0].values.map(v => v.id);
  for (const [key, series] of Object.entries(json.dataSets[0].series)) {
    const parts = key.split(':').map(Number);
    const ccy = ccyDim.values[parts[ccyIdx]].id;
    result[ccy] = {};
    for (const [oi, ov] of Object.entries(series.observations)) {
      if (ov[0] !== null && ov[0] !== undefined) result[ccy][periods[parseInt(oi)]] = ov[0];
    }
  }
  return result;
}

/**
 * Returns how many PLN equals 1 unit of `currency` for the given month.
 * Uses the nearest prior available rate if exact month is missing.
 * Returns null when rates are still loading or unavailable for the currency.
 */
function getPlnPerUnit(currency, yearMonth) {
  if (currency === 'PLN') return 1;
  if (ecbRates === null) return null; // still loading

  const nearest = (series, ym) => {
    if (!series) return null;
    if (series[ym] != null) return series[ym];
    const prior = Object.keys(series).filter(m => m <= ym).sort();
    return prior.length ? series[prior[prior.length - 1]] : null;
  };

  const plnPerEur = nearest(ecbRates['PLN'], yearMonth);
  if (plnPerEur == null) return null;
  if (currency === 'EUR') return plnPerEur;

  const ccyPerEur = nearest(ecbRates[currency], yearMonth);
  if (ccyPerEur == null) return null;
  return plnPerEur / ccyPerEur; // PLN per 1 unit of foreign currency
}

let chart = null;
let chartKeys = [];

function getAvailableYears(fuelType) {
  return [...new Set(Object.keys(fuelPrices[fuelType]).map(k => k.slice(0, 4)))].sort();
}

function getAvailableMonths(fuelType, year) {
  return Object.keys(fuelPrices[fuelType])
    .filter(k => k.startsWith(year + '-'))
    .map(k => k.slice(5))
    .sort();
}

function populateSelects(fuelType) {
  const yearSelect = document.getElementById('year');
  const currentYear = yearSelect.value || null;
  const currentMonth = document.getElementById('month').value || null;
  yearSelect.innerHTML = '';
  const years = getAvailableYears(fuelType);
  years.forEach(y => {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  });
  if (currentYear && years.includes(currentYear)) {
    yearSelect.value = currentYear;
  } else {
    yearSelect.value = years[years.length - 1];
  }
  populateMonthSelect(fuelType, yearSelect.value, currentMonth);
}

function populateMonthSelect(fuelType, year, preferredMonth) {
  const monthSelect = document.getElementById('month');
  monthSelect.innerHTML = '';
  const months = getAvailableMonths(fuelType, year);
  months.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = MONTH_NAMES[parseInt(m, 10) - 1];
    monthSelect.appendChild(opt);
  });
  if (preferredMonth && months.includes(preferredMonth)) {
    monthSelect.value = preferredMonth;
  } else {
    monthSelect.value = months[months.length - 1];
  }
}

function getSelectedPrice() {
  const manualPrice = parseFloat(document.getElementById('manualPrice').value);
  if (!isNaN(manualPrice) && manualPrice > 0) {
    return manualPrice;
  }
  const fuelType = document.getElementById('fuelType').value;
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  return fuelPrices[fuelType][`${year}-${month}`];
}

function calculate() {
  const wage = parseFloat(document.getElementById('wage').value);
  const currency = document.getElementById('currency').value;
  const consumption = parseFloat(document.getElementById('consumption').value);
  const consumptionWarning = document.getElementById('consumptionWarning');
  if (consumptionWarning) {
    consumptionWarning.style.display = (!isNaN(consumption) && consumption > 30) ? 'block' : 'none';
  }
  const pricePerLiter = getSelectedPrice();

  const fuelType = document.getElementById('fuelType').value;
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const yearMonth = `${year}-${month}`;

  const speedEl = document.getElementById('speedValue');
  const speedUnit = document.getElementById('speedUnit');
  const noResult = document.getElementById('noResult');
  const resultDetails = document.getElementById('resultDetails');
  const priceEl = document.getElementById('detailPrice');
  const costEl = document.getElementById('detailCost');
  const rateBox = document.getElementById('detailRateBox');
  const rateEl = document.getElementById('detailRate');

  // Resolve exchange rate (PLN per 1 unit of chosen currency)
  const plnPerUnit = getPlnPerUnit(currency, yearMonth);

  // Wage expressed in PLN
  const wagePLN = (currency === 'PLN') ? wage : (plnPerUnit != null ? wage * plnPerUnit : NaN);

  // Show loading hint when rates are still being fetched
  const ratesStatus = document.getElementById('ratesStatus');
  if (currency !== 'PLN' && ecbRates === null && ratesStatus && !ratesStatus.textContent) {
    ratesStatus.textContent = 'Pobieranie kursów walut…';
  }

  if (isNaN(wagePLN) || wagePLN <= 0 || isNaN(consumption) || consumption <= 0 ||
      !pricePerLiter || pricePerLiter <= 0) {
    speedEl.textContent = (currency !== 'PLN' && ecbRates === null) ? '…' : '—';
    speedUnit.style.display = 'none';
    noResult.style.display = 'block';
    resultDetails.style.display = 'none';
    return;
  }

  const costPerKm = (consumption / 100) * pricePerLiter;
  const speed = wagePLN / costPerKm;

  speedEl.textContent = speed.toFixed(1);
  speedUnit.style.display = 'block';
  noResult.style.display = 'none';
  resultDetails.style.display = 'grid';
  priceEl.textContent = pricePerLiter.toFixed(2) + ' zł/l';
  costEl.textContent = costPerKm.toFixed(4) + ' zł/km';

  if (rateBox && rateEl) {
    if (currency !== 'PLN' && plnPerUnit != null) {
      rateEl.textContent = `1 ${currency} = ${plnPerUnit.toFixed(4)} PLN`;
      rateBox.style.display = '';
    } else {
      rateBox.style.display = 'none';
    }
  }

  updateChart();
}

function updateChart() {
  const wage = parseFloat(document.getElementById('wage').value);
  const consumption = parseFloat(document.getElementById('consumption').value);
  const fuelType = document.getElementById('fuelType').value;
  const currency = document.getElementById('currency').value;

  if (isNaN(wage) || wage <= 0 || isNaN(consumption) || consumption <= 0) {
    if (chart) {
      chart.data.datasets[0].data = [];
      chart.update();
    }
    return;
  }

  chartKeys = Object.keys(fuelPrices[fuelType]).sort();
  const labels = chartKeys.map(k => {
    const [y, m] = k.split('-');
    return `${MONTH_SHORT[parseInt(m, 10) - 1]} '${y.slice(2)}`;
  });
  const speeds = chartKeys.map(k => {
    const price = fuelPrices[fuelType][k];
    const plnPerUnit = getPlnPerUnit(currency, k);
    if (plnPerUnit == null) return null;
    const wagePLN = wage * plnPerUnit;
    const costPerKm = (consumption / 100) * price;
    return parseFloat((wagePLN / costPerKm).toFixed(2));
  });

  const currencyLabel = currency === 'PLN' ? '' : ` [stawka w ${currency}]`;

  if (typeof Chart === 'undefined') return;

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = speeds;
    chart.data.datasets[0].label = `Prędkość (${fuelType})${currencyLabel} [km/h]`;
    chart.update();
  } else {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `Prędkość (${fuelType})${currencyLabel} [km/h]`,
          data: speeds,
          borderColor: '#e94560',
          backgroundColor: 'rgba(233,69,96,0.12)',
          pointBackgroundColor: '#f5a623',
          pointBorderColor: '#f5a623',
          pointRadius: 3,
          pointHoverRadius: 6,
          tension: 0.3,
          fill: true,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#a0aec0', font: { size: 13 } }
          },
          tooltip: {
            callbacks: {
              title: items => {
                const key = chartKeys[items[0].dataIndex];
                const [y, m] = key.split('-');
                return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${y}`;
              },
              label: ctx => {
                const key = chartKeys[ctx.dataIndex];
                const lines = [`${ctx.parsed.y.toFixed(1)} km/h`];
                if (currency !== 'PLN') {
                  const rate = getPlnPerUnit(currency, key);
                  if (rate != null) lines.push(`1 ${currency} = ${rate.toFixed(4)} PLN`);
                }
                return lines;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#718096',
              maxRotation: 45,
              callback: function(val) {
                const label = this.getLabelForValue(val);
                return (label && label.startsWith('sty')) ? label : '';
              }
            },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            ticks: {
              color: '#718096',
              callback: val => val + ' km/h'
            },
            grid: { color: 'rgba(255,255,255,0.07)' }
          }
        }
      }
    });
  }
}

document.getElementById('fuelType').addEventListener('change', function () {
  populateSelects(this.value);
  calculate();
});

document.getElementById('year').addEventListener('change', function () {
  const fuelType = document.getElementById('fuelType').value;
  const currentMonth = document.getElementById('month').value;
  populateMonthSelect(fuelType, this.value, currentMonth);
  calculate();
});

document.getElementById('month').addEventListener('change', calculate);
document.getElementById('wage').addEventListener('input', calculate);
document.getElementById('consumption').addEventListener('input', calculate);
document.getElementById('manualPrice').addEventListener('input', calculate);
document.getElementById('currency').addEventListener('change', function () {
  if (this.value !== 'PLN' && ecbRates === null) {
    fetchECBRates();
  } else {
    calculate();
  }
});

populateSelects(document.getElementById('fuelType').value);
calculate();
fetchECBRates();
