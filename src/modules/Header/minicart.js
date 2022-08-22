import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeImage, changeNumberInCart, addTocard } from '../../Redux/cart/cart';
import '../../styles/miniCart.css';

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShown: 0,
      hoverCart: false,
    };
    this.myRef = createRef();
  }

  setImageN = (arr) => {
    if (this.state.imageShown <= 0) {
      this.setState({ imageShown: arr.length - 1 });
    } else {
      this.setState({ imageShown: this.state.imageShown - 1 });
    }
  }

  setImageP = (arr) => {
    if (this.state.imageShown >= arr.length - 1) {
      this.setState({ imageShown: 0 });
    } else {
      this.setState({ imageShown: this.state.imageShown + 1 });
    }
  }

  cartLength = () => {
    let cartLength = 0;
    this.props.cart.forEach((miniCart) => {
      cartLength += miniCart.itemsNumber;
    });
    return cartLength;
  }

  cartTotal = () => {
    let cartTotal = 0;
    this.props.cart.forEach((miniCart) => {
      const { amount } = miniCart.prices[this.props.currencieId];
      cartTotal += amount * miniCart.itemsNumber;
    });

    return cartTotal;
  }

  addTocart = () => {
    const detailsLink = localStorage.getItem('descriptionLink');
    if (window.location.pathname.split('/').join('') === detailsLink.split('/').join('')) {
      const item = JSON.parse(localStorage.getItem('productToCheck'));
      if (item.inStock) {
        this.props.addTocard(item);
      }
    }
  }

  render() {
    return (
      <div className={this.props.cartShown ? 'miniCart' : 'hiddenMiniCart'}>
        <div className="container-mini">
          <h2 className="miniCart-bigTitle">
            My Bag,
            <span>
              {this.cartLength()}
              {' '}
              Items
            </span>
          </h2>
          <div
            ref={this.myRef}
            onMouseOver={() => this.setState({ hoverCart: true })}
            onMouseLeave={() => this.setState({ hoverCart: false })}
            className={this.state.hoverCart ? 'articles-miniCart' : 'articles-miniCart  cartHover'}
          >

            {
            this.props.cart.map((item) => {
              let sizeProduct = [];
              let colorProduct = [];
              const newProduct = item;
              if (newProduct !== undefined) {
                if (newProduct.attributes.length > 1) {
                  colorProduct = newProduct.attributes.filter((size) => size.name === 'Color');
                }
                sizeProduct = newProduct.attributes.filter((size) => size.name !== 'Color');
              }

              return (
                <div
                  key={item.id}
                  className="miniCardElement"
                  ref={this.myRef}
                >
                  <div className="miniCardDetails">
                    <h4 className="miniCard_title">{item.brand}</h4>
                    <h4 className="miniCard_name">{item.name}</h4>
                    <p className="miniCard_price">
                      {item.prices[this.props.currencieId].currency.symbol}
                      {item.prices[this.props.currencieId].amount.toFixed(2)}
                    </p>

                    {sizeProduct.length > 0
                      ? sizeProduct.map((attribute, id) => (
                        <>
                          <p className="miniCard_size">
                            {attribute.name}
                            :
                          </p>
                          <div className="miniContainer_sizes">
                            {
                            attribute.items.map((size, key) => (
                              <p key={size} className={item[`sizeSelected${id}`] === key ? 'miniChosenSize' : 'miniProductSize'}>{size.value}</p>
                            ))
                          }
                          </div>
                        </>
                      )) : ''}

                    {
                          colorProduct.length > 0
                            ? (
                              <>
                                <p className="miniCard_size">
                                  {colorProduct[0].id}
                                  :
                                </p>
                                <div className="miniContainer_colors">
                                  {
                          colorProduct[0].items.map((color, key) => (
                            <div key={color} className={item.colorSelected === key ? 'minChosenColor' : 'miniColor'}>
                              <div
                                className="miniProductcolor"
                                style={{ backgroundColor: color.value }}
                              />
                            </div>
                          ))
                         }
                                </div>
                              </>
                            )
                            : (<></>)
                        }
                  </div>
                  <div className="imageAndButton">
                    <div className="miniAdd_product">
                      <button
                        type="button"
                        className="mbtn1"
                        onClick={() => { this.props.changeNumberInCart('plus', item); }}
                      >
                        +
                      </button>
                      <p className="numberItems">{item.itemsNumber}</p>
                      <button
                        type="button"
                        className="mbtn2"
                        onClick={() => this.props.changeNumberInCart('moins', item)}
                      >
                        -
                      </button>
                    </div>
                    <div className="miniCartImgContainer">
                      <img src={item.gallery[0]} alt="" className="cartImg" />
                    </div>
                  </div>
                </div>
              );
            })
        }
          </div>

          <div className="miniCartBottom">
            <div className="Total">
              <h3>Total:</h3>
              {
                this.props.currencies.length > 0
                  ? (
                    <h3 className="titleTotal">
                      {this.props.currencies[this.props.currencieId].symbol}
                      {this.cartTotal().toFixed(2)}
                    </h3>
                  ) : ''
              }
            </div>
            <div className="buttonsCheckout">

              <Link
                to="../cart"
                className="viewBag"
                onClick={this.props.showCardPage}
              >
                VIEW BAG
              </Link>
              <button
                type="button"
                onClick={() => this.addTocart()}
                className="checkout-btn"
              >
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => (
  {
    cart: state.cartReducer,
    currencies: state.currenciesReducer,
  });

const mapDispatch = (dispatch) => ({
  changeImage: (btn, item) => dispatch(changeImage(btn, item)),
  changeNumberInCart: (btn, item) => dispatch(changeNumberInCart(btn, item)),
  addTocard: (item) => dispatch(addTocard(item)),
});

export default connect(mapState, mapDispatch)(MiniCart);
