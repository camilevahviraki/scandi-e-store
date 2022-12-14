import axios from 'axios';
import { URL, getProduct } from '../queries/queries';

const FETCH_PRODUCT = 'scandiweb-app/src/redux/FETCH_PRODUCT';

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCT: {
      return action.product;
    }
    default:
      return state;
  }
};

export const fetchProduct = (id) => (dispatch) => {
  axios.post(URL, {
    query: getProduct(id),
  }).then((response) => dispatch(
    {
      type: FETCH_PRODUCT,
      product: response.data.data,
    },
  ));
};

export default productReducer;
