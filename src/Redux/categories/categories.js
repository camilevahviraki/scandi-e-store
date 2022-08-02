import axios from 'axios';
import { URL, getCategories } from '../queries/queries';

const FETCH_CATEGORIES = 'scandiweb-app/src/redux/FETCH_CATEGORIES';
const CHANGE_STORED_STATUS = 'scandiweb-app/src/redux/CHANGE_STORED_STATUS';

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
    {
      const storedInCart = false;
      const all = action.categories.categories[0].products;
      const clothes = action.categories.categories[1].products;
      const tech = action.categories.categories[2].products;

      let newAll = [];
      let newClothes = [];
      let newTech = [];

      all.forEach((product) => {
        product = { ...product, storedInCart };
        newAll = [...newAll, product];
      });

      clothes.forEach((product) => {
        product = { ...product, storedInCart };
        newClothes = [...newClothes, product];
      });

      tech.forEach((product) => {
        product = { ...product, storedInCart };
        newTech = [...newTech, product];
      });

      const allToPush = { name: 'all', products: newAll };
      const clothesToPush = { name: 'clothes', products: newClothes };
      const techToPush = { name: 'tech', products: newTech };
      const storedData = [allToPush, clothesToPush, techToPush];
      return storedData;
    }
    case CHANGE_STORED_STATUS: {
      const all = state[0].products;
      const clothes = state[1].products;
      const tech = state[2].products;
      let newAll = [];
      let newClothes = [];
      let newTech = [];
      all.forEach((item) => {
        if (item.name === action.data) {
          item.storedInCart = true;
        }
        newAll = [...newAll, item];
      });
      clothes.forEach((item) => {
        if (item.name === action.data) {
          item.storedInCart = true;
        }
        newClothes = [...newClothes, item];
      });
      tech.forEach((item) => {
        if (item.name === action.data) {
          item.storedInCart = true;
        }
        newTech = [...newTech, item];
      });
      const dataToStore = [
        { name: 'all', products: newAll },
        { name: 'clothes', products: newClothes },
        { name: 'tech', products: newTech },
      ];

      return dataToStore;
    }
    default:
      return state;
  }
};

export const changeStoredStatus = (item) => ({
  type: CHANGE_STORED_STATUS,
  data: item,
});

export const fetchCategories = () => (dispatch) => {
  axios.post(URL, {
    query: getCategories,
  }).then((response) => dispatch(
    {
      type: FETCH_CATEGORIES,
      categories: response.data.data,
    },
  ));
};

export default categoryReducer;
