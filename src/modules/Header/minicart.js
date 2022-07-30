import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeImage, changeNumberInCart } from '../../Redux/cart/cart';
import '../../styles/miniCart.css';


class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShown: 0,
      imagesDisplay: [],
      currencies: ['$', '£', 'A$', '¥', '₽'],
    };
  }

  imagesDisplay = []

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

  render() {
    console.log('My cart =>', this.props.cart);
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
            onMouseOver={() => this.setState({hoverCart: true})}
            onMouseLeave={() => this.setState({hoverCart: false})}
            className={this.state.hoverCart? "articles-miniCart":"articles-miniCart  cartHover"}
          >
            {
            this.props.cart.map((item, key) => {
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
                >
                  <div className="miniCardDetails">
                    <h4 className="miniCard_title">{item.brand}</h4>
                    <h4 className="miniCard_name">{item.name}</h4>
                    <p className="miniCard_price">
                      {item.prices[this.props.currencieId].currency.symbol}
                      {item.prices[this.props.currencieId].amount}
                    </p>
                    {sizeProduct.length > 0 ? (<p className="miniCard_size">Size:</p>) : (<></>)}

                    {sizeProduct.length > 0
                      ? (
                        <div className="miniContainer_sizes">
                          {
                            sizeProduct[0].items.map((size, key) => (
                              <p className={item.sizeSelected === key ? 'miniChosenSize' : 'miniProductSize'}>{size.value}</p>
                            ))
                          }
                        </div>
                      ) : ''}
                    {colorProduct.length > 0 ? (<p className="miniCard_size">Color:</p>) : (<></>)}

                    {
                          colorProduct.length > 0
                            ? (
                              <div className="miniContainer_colors">
                                {
                          colorProduct[0].items.map((color, key) => (
                            <div className={item.colorSelected === key ? 'minChosenColor' : 'miniColor'}>
                              <div
                                className="miniProductcolor"
                                style={{ backgroundColor: color.value }}
                              />
                            </div>
                          ))
                         }
                              </div>
                            )
                            : (<></>)
                        }
                  </div>
                  <div className="imageAndButton">
                    <div className="miniAdd_product">
                      <button
                        className="mbtn1"
                        onClick={() => this.props.changeNumberInCart('plus', item)}
                      >
                        +
                      </button>
                      <p className="numberItems">{item.itemsNumber}</p>
                      <button
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
              <h3 className="titleTotal">
                {this.state.currencies[this.props.currencieId]}
                {this.cartTotal().toFixed(2)}
              </h3>
            </div>
            <div className="buttonsCheckout">

              <Link to="../cart"
                className="viewBag"
                onClick={this.props.showCardPage}
              >
                VIEW BAG
              </Link>
              <button className="checkout-btn">
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ cart: state.cartReducer });

const mapDispatchToProps = (dispatch) => ({
  changeImage: (btn, item) => dispatch(changeImage(btn, item)),
  changeNumberInCart: (btn, item) => dispatch(changeNumberInCart(btn, item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);