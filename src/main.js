import Swal from 'sweetalert2';
import { renderCoin } from './components';
import { fetchRates } from './services/api';
import './style.css';

const button = document.querySelector('#searchBtn');
const input = document.querySelector('#input');
const description = document.querySelector('#descriptionTitle');
const currencyValue = document.querySelector('#currencyValues');

const clearBoardCurreny = () => {
  description.innerHTML = '';
  currencyValue.innerHTML = '';
  input.focus();
};

function handleSearch(event) {
  event.preventDefault();
  const inputValue = input.value.toUpperCase();

  fetchRates(inputValue)
  .then((data) => {
    clearBoardCurreny();
    description.innerHTML = `Valores referentes a 1 ${data.base_code}`;

    const coinElements = renderCoin(data);

    currencyValue.append(...coinElements);

    input.value = '';
  })
  .catch((err) => {
    Swal.fire({
      title: 'Erro!',
      text: 'Por favor, digite uma moeda válida',
      icon: 'error',
      confirmButtonText: 'Entendi'
    })
  });
}

button.addEventListener('click', handleSearch);
