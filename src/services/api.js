const BASE_URL = 'https://v6.exchangerate-api.com/v6/6004f5bde4e6e16bd8be1f33/latest/';

export function fetchRates(searchedCoin) {
  return fetch(`${BASE_URL}${searchedCoin}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      const rates = Object.entries(data.conversion_rates);

      const allRates = rates.map((rate) => ({name: rate[0], value: rate[1]}));
      return {
        conversion_rates: allRates,
        base_code: data.base_code,
      };
    });
}