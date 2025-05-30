const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");

updateRate();

function updateRate() {
  fetch(
    `https://v6.exchangerate-api.com/v6/0b9ff6e6b1d27532c0a4fb9b/latest/${currencyFirstEl.value}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      if (!data.conversion_rates) {
        throw new Error("Invalid data from API");
      }
      const rate = data.conversion_rates[currencySecondEl.value];
      if (!rate) {
        throw new Error("Invalid currency code");
      }
      exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${rate.toFixed(4)} ${currencySecondEl.value}`;
      worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
      exchangeRateEl.classList.remove("error");
      exchangeRateEl.classList.remove("loading");
    })
    .catch((error) => {
      exchangeRateEl.innerText = "Error fetching exchange rate";
      exchangeRateEl.classList.add("error");
      worthSecondEl.value = "";
      console.error("Error:", error);
    });
}

currencyFirstEl.addEventListener("change", updateRate);
currencySecondEl.addEventListener("change", updateRate);
worthFirstEl.addEventListener("input", updateRate);
