const fuelPrices = {
  "LPG":  { 2020: 1.89, 2021: 2.30, 2022: 3.14, 2023: 2.78, 2024: 2.85, 2025: 2.90 },
  "Pb95": { 2020: 4.47, 2021: 5.53, 2022: 6.98, 2023: 6.35, 2024: 6.40, 2025: 6.50 },
  "Pb98": { 2020: 4.84, 2021: 5.91, 2022: 7.42, 2023: 6.82, 2024: 6.90, 2025: 7.00 },
  "ON":   { 2020: 4.52, 2021: 5.56, 2022: 7.58, 2023: 6.56, 2024: 6.60, 2025: 6.70 }
};

let chart = null;

function getAvailableYears(fuelType) {
  return Object.keys(fuelPrices[fuelType]).map(Number).sort((a, b) => a - b);
}

function populateYearSelect(fuelType) {
  const yearSelect = document.getElementById('year');
  const currentYear = yearSelect.value ? Number(yearSelect.value) : null;
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
}

function getSelectedPrice() {
  const manualPrice = parseFloat(document.getElementById('manualPrice').value);
  if (!isNaN(manualPrice) && manualPrice > 0) {
    return manualPrice;
  }
  const fuelType = document.getElementById('fuelType').value;
  const year = Number(document.getElementById('year').value);
  return fuelPrices[fuelType][year];
}

function calculate() {
  const wage = parseFloat(document.getElementById('wage').value);
  const consumption = parseFloat(document.getElementById('consumption').value);
  const consumptionWarning = document.getElementById('consumptionWarning');
  if (consumptionWarning) {
    consumptionWarning.style.display = (!isNaN(consumption) && consumption > 30) ? 'block' : 'none';
  }
  const pricePerLiter = getSelectedPrice();

  const speedEl = document.getElementById('speedValue');
  const speedUnit = document.getElementById('speedUnit');
  const noResult = document.getElementById('noResult');
  const resultDetails = document.getElementById('resultDetails');
  const priceEl = document.getElementById('detailPrice');
  const costEl = document.getElementById('detailCost');

  if (isNaN(wage) || wage <= 0 || isNaN(consumption) || consumption <= 0 || !pricePerLiter || pricePerLiter <= 0) {
    speedEl.textContent = '—';
    speedUnit.style.display = 'none';
    noResult.style.display = 'block';
    resultDetails.style.display = 'none';
    return;
  }

  const costPerKm = (consumption / 100) * pricePerLiter;
  const speed = wage / costPerKm;

  speedEl.textContent = speed.toFixed(1);
  speedUnit.style.display = 'block';
  noResult.style.display = 'none';
  resultDetails.style.display = 'grid';
  priceEl.textContent = pricePerLiter.toFixed(2) + ' zł/l';
  costEl.textContent = costPerKm.toFixed(4) + ' zł/km';

  updateChart();
}

function updateChart() {
  const wage = parseFloat(document.getElementById('wage').value);
  const consumption = parseFloat(document.getElementById('consumption').value);
  const fuelType = document.getElementById('fuelType').value;

  if (isNaN(wage) || wage <= 0 || isNaN(consumption) || consumption <= 0) {
    if (chart) {
      chart.data.datasets[0].data = [];
      chart.update();
    }
    return;
  }

  const years = getAvailableYears(fuelType);
  const speeds = years.map(y => {
    const price = fuelPrices[fuelType][y];
    const costPerKm = (consumption / 100) * price;
    return parseFloat((wage / costPerKm).toFixed(2));
  });

  if (typeof Chart === 'undefined') return;

  if (chart) {
    chart.data.labels = years;
    chart.data.datasets[0].data = speeds;
    chart.data.datasets[0].label = `Prędkość (${fuelType}) [km/h]`;
    chart.update();
  } else {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: `Prędkość (${fuelType}) [km/h]`,
          data: speeds,
          borderColor: '#e94560',
          backgroundColor: 'rgba(233,69,96,0.12)',
          pointBackgroundColor: '#f5a623',
          pointBorderColor: '#f5a623',
          pointRadius: 5,
          pointHoverRadius: 7,
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
              label: ctx => `${ctx.parsed.y.toFixed(1)} km/h`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#718096' },
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
  populateYearSelect(this.value);
  calculate();
});

document.getElementById('year').addEventListener('change', calculate);
document.getElementById('wage').addEventListener('input', calculate);
document.getElementById('consumption').addEventListener('input', calculate);
document.getElementById('manualPrice').addEventListener('input', calculate);

populateYearSelect(document.getElementById('fuelType').value);
calculate();
