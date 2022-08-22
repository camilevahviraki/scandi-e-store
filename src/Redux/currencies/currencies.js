import axios from 'axios';
import { getCurrencies, URL } from '../queries/queries';

const GET_CURRENCIES = 'scandiweb-app/src/redux/GET_CURRENCIES';

const currenciesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return action.currencies;
    default:
      return state;
  }
};

export const fetchCurrencies = () => (dispatch) => {
  axios.post(URL, {
    query: getCurrencies,
  }).then((response) => dispatch(
    {
      type: GET_CURRENCIES,
      currencies: response.data.data.currencies,
    },
  ));
};

export default currenciesReducer;
