import axios from 'axios';
import { URL, getCategories } from '../queries/queries';

const FETCH_CATEGORIES = 'scandiweb-app/src/redux/FETCH_CATEGORIES';

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export const fetchCategories = () => (dispatch) => {
  axios.post(URL, {
    query: getCategories,
  }).then((response) => dispatch(
    {
      type: FETCH_CATEGORIES,
      categories: response.data.data.categories,
    },
  ));
};

export default categoriesReducer;
