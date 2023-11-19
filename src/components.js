
const currencyValue = document.querySelector('#currencyValues');

export function createElement(nome, value) {
  const newElement = document.createElement('div');
  newElement.classList = 'newElement';

  newElement.innerHTML = `
  ${nome} <span>${value}</span>`;

  return newElement;
};

export function renderCoin(coins) {
  return coins.conversion_rates.map((coin) => createElement(coin.name, coin.value));
};