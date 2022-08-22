import axios from 'axios';
import { URL, getCategory } from '../queries/queries';

const FETCH_CATEGORY = 'scandiweb-app/src/redux/FETCH_CATEGORY';

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export const fetchCategory = (name) => (dispatch) => {
  axios.post(URL, {
    query: getCategory(name),
  }).then((response) => dispatch(
    {
      type: FETCH_CATEGORY,
      category: response.data.data,
    },
  ));
};

export default categoryReducer;
