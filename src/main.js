import './style.css'
import Swal from 'sweetalert2'

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

const clearBoardCurreny = () => {
  description.innerHTML = '';
  currencyValue.innerHTML = '';
  input.focus();
};

button.addEventListener('click', (event) => {
  event.preventDefault();

  const moeda = input.value.toUpperCase();

  fetch(`https://v6.exchangerate-api.com/v6/6004f5bde4e6e16bd8be1f33/latest/${moeda}`)
  .then((response) => response.json())
  .then((data) => {
    clearBoardCurreny();
    description.innerHTML = `Valores referentes a 1 ${data.base_code}`;
    setElementsValues(data);
    input.value = '';
  })
  .catch(() => {
    input.value = '';
    clearBoardCurreny();
    
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  });
});


