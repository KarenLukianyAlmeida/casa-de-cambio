import './style.css'

const button = document.querySelector('#searchBtn');
const input = document.querySelector('#input');
const description = document.querySelector('#descriptionTitle');
const currencyValue = document.querySelector('#currencyValues') ;

const setElementsValues = (object) => {
  const currencyArray = Object.keys(object.conversion_rates);

  currencyArray.map((currency) => {
    if (object.conversion_rates[currency]) {
      const newElement = document.createElement('div');
      newElement.classList = 'newElement';
      newElement.innerHTML = `${currency} ${object.conversion_rates[currency]}`;
      currencyValue.appendChild(newElement);
    }
  })
};

button.addEventListener('click', (event) => {
  event.preventDefault();

  const moeda = input.value.toUpperCase();

  fetch(`https://v6.exchangerate-api.com/v6/6004f5bde4e6e16bd8be1f33/latest/${moeda}`)
  .then((response) => response.json())
  .then((data) => {
    description.innerHTML = `Valores referentes a 1 ${data.base_code}`;
    const arrayValues = data.conversion_rates;
    setElementsValues(data);
  })
});


