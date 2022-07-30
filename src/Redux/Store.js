import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from './logger/thunk';
import logger from './logger/logger';
import categoryReducer from './categories/categories';
import productReducer from './product/product';
import cartReducer from './cart/cart';

const rootReducer = combineReducers({
  categoryReducer,
  productReducer,
  cartReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
);

export default store;
