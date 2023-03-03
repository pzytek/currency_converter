let currencyFirst = document.getElementById("currency-first");
const currencySecond = document.getElementById("currency-second");
const rate = document.getElementById("rate");
const exchange = document.getElementById("exchange");
const reset = document.getElementById("reset");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

let valFirst = document.getElementById("currency-first").value;
let valSecond = currencySecond.value;

console.log(valFirst, valSecond);

exchange.addEventListener("click", getResult);
reset.addEventListener("click", resetValues);
currencyFirst.addEventListener("change", getRate);
currencySecond.addEventListener("change", getRate);

let valRate = 0;
function getRate() {
  if (
    currencyFirst.value != "" &&
    currencySecond.value != "" &&
    currencyFirst.value != currencySecond.value
  ) {
    fetch(
      `https://api.frankfurter.app/latest?amount=1&from=${currencyFirst.value}&to=${currencySecond.value}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        valRate = Object.values(data.rates)[0];
        rate.innerHTML = `1 ${currencyFirst.value} = ${valRate} ${currencySecond.value}`;
      });
  }
}

function getResult() {
  result.innerHTML = `${amount.value} ${currencyFirst.value} = ${(
    valRate * amount.value
  ).toFixed(2)} ${currencySecond.value}`;
}

function resetValues() {
  result.innerHTML = "";
  rate.innerHTML = "";
  currencyFirst.value = "";
  currencySecond.value = "";
  amount.value = 1;
}
