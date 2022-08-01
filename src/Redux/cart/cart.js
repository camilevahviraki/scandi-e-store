const ADD_TO_CARD = 'scandiweb-app/src/redux/ADD_TO_CARD';
const CHANGE_IMAGE = 'scandiweb-app/src/redux/CHANGE_IMAGE';
const CHANGE_NUMBER_IN_CART = 'scandiweb-app/src/redux/CHANGE_NUMBER_IN_CART';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CARD: {
      let duplicate = [];
      let stateIfDuplicate = [];
      state.forEach((item) => {
        if (action.product.id === item.id && action.product.colorSelected === item.colorSelected && action.product.sizeSelected === item.sizeSelected) {
          duplicate = [...duplicate, item];
        }
      });
      if (duplicate.length > 0) {
        state.forEach((item) => {
          if (action.product.id === item.id && action.product.colorSelected === item.colorSelected && action.product.sizeSelected === item.sizeSelected) {
            item.itemsNumber += 1;
          }
          stateIfDuplicate = [...stateIfDuplicate, item];
        });
        localStorage.setItem('cart', JSON.stringify(stateIfDuplicate));
        return stateIfDuplicate;
      }
      const imagesDisplay = 0;
      const itemsNumber = 1;
      action.product = { ...action.product, imagesDisplay };
      action.product = { ...action.product, itemsNumber };
      const newState = [...state, action.product];
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    }
    case CHANGE_IMAGE: {
      const itemName = action.data.item;
      const itemBtn = action.data.btn;
      let newState = [];
      state.forEach((item) => {
        if (item.name === itemName.name && item.colorSelected === itemName.colorSelected && item.sizeSelected === itemName.sizeSelected) {
          if (itemBtn === 'plus') {
            if (item.imagesDisplay >= item.gallery.length - 1) {
              item.imagesDisplay = 0;
            } else {
              item.imagesDisplay += 1;
            }
          } else if (itemBtn === 'moins') {
            if (item.imagesDisplay <= 0) {
              item.imagesDisplay = item.gallery.length - 1;
            } else {
              item.imagesDisplay -= 1;
            }
          }
        }
        newState = [...newState, item];
      });

      return newState;
    }
    case CHANGE_NUMBER_IN_CART: {
      const itemName = action.data.item;
      const itemBtn = action.data.btn;
      let newState = [];
      state.forEach((item) => {
        if (item.name === itemName.name && item.colorSelected === itemName.colorSelected && item.sizeSelected === itemName.sizeSelected) {
          if (itemBtn === 'plus') {
            item.itemsNumber += 1;
          } else if (itemBtn === 'moins') {
            if (item.itemsNumber === 0) {
              item.itemsNumber += 0;
            } else {
              item.itemsNumber -= 1;
            }
          }
        }
        newState = [...newState, item];
      });
      const stateToStore = newState.filter((item) => item.itemsNumber !== 0);
      localStorage.setItem('cart', JSON.stringify(stateToStore))
      return stateToStore;
    }
    default: {
      const stored = JSON.parse(localStorage.getItem('cart'));
      if(stored){
        return stored
      }
      localStorage.setItem('cart', JSON.stringify([]));
      return state;
    }  
  }
};

export const changeNumberInCart = (btn, item) => ({ type: CHANGE_NUMBER_IN_CART, data: { btn, item } });

export const changeImage = (btn, item) => ({ type: CHANGE_IMAGE, data: { btn, item } });

export const addTocard = (product) => ({ type: ADD_TO_CARD, product });

export default cartReducer;
