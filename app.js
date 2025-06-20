const units = {
  length: {
    meter: 1,
    kilometer: 0.001,
    mile: 0.000621371,
    feet: 3.28084
  },
  weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462
  },
  temperature: {
    celsius: "celsius",
    fahrenheit: "fahrenheit",
    kelvin: "kelvin"
  }
};

const categoryEl = document.getElementById("category");
const fromUnitEl = document.getElementById("fromUnit");
const toUnitEl = document.getElementById("toUnit");
const inputEl = document.getElementById("inputValue");
const resultEl = document.getElementById("result");

// Load initial units
loadUnits("length");

categoryEl.addEventListener("change", () => {
  loadUnits(categoryEl.value);
  resultEl.textContent = "Result will appear here";
});

function loadUnits(category) {
  const unitList = Object.keys(units[category]);
  fromUnitEl.innerHTML = "";
  toUnitEl.innerHTML = "";

  unitList.forEach(unit => {
    fromUnitEl.innerHTML += `<option value="${unit}">${capitalize(unit)}</option>`;
    toUnitEl.innerHTML += `<option value="${unit}">${capitalize(unit)}</option>`;
  });
}

function convert() {
  const category = categoryEl.value;
  const inputValue = parseFloat(inputEl.value);
  const fromUnit = fromUnitEl.value;
  const toUnit = toUnitEl.value;

  if (isNaN(inputValue)) {
    resultEl.textContent = "Please enter a valid number";
    return;
  }

  let result;

  if (category === "temperature") {
    result = convertTemperature(inputValue, fromUnit, toUnit);
  } else {
    const base = inputValue / units[category][fromUnit];
    result = base * units[category][toUnit];
  }

  resultEl.textContent = `${inputValue} ${capitalize(fromUnit)} = ${result.toFixed(3)} ${capitalize(toUnit)}`;
}

function convertTemperature(value, from, to) {
  if (from === to) return value;

  let celsius;
  if (from === "celsius") celsius = value;
  else if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
  else if (from === "kelvin") celsius = value - 273.15;

  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return (celsius * 9 / 5) + 32;
  if (to === "kelvin") return celsius + 273.15;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}