import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/thunk';
import logger from './logger/logger';
import categoriesReducer from './categories/categories';
import productReducer from './product/product';
import cartReducer from './cart/cart';
import currenciesReducer from './currencies/currencies';
import categoryReducer from './category/category';

const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  cartReducer,
  currenciesReducer,
  categoriesReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
