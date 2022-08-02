import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeImage, changeNumberInCart } from '../../Redux/cart/cart';
import '../../styles/cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShown: 0,
      currencies: ['$', '£', 'A$', '¥', '₽'],
    };
  }

  componentDidMount() {
    this.props.cartShown(false);
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

  render() {
    return (
      <div className="cartPage">
        <h2 className="cartTitle">CART</h2>
        <div className="grey-line" />
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
                  className="cardElement"
                >
                  <div className="cardDetails">
                    <h4 className="card_title">{item.brand}</h4>
                    <h4 className="card_name">{item.name}</h4>
                    <p className="card_price">
                      {item.prices[this.props.currencieId].currency.symbol}
                      {item.prices[this.props.currencieId].amount}
                    </p>
                    {sizeProduct.length > 0 ? (<p className="card_size">SIZE:</p>) : (<></>)}

                    {sizeProduct.length > 0
                      ? (
                        <div className="container_sizes">
                          {
                            sizeProduct[0].items.map((size, key) => (
                              <p key={size} className={item.sizeSelected === key ? 'chosenSize' : 'productSize'}>{size.value}</p>
                            ))
                          }
                        </div>
                      ) : ''}
                    {colorProduct.length > 0 ? (<p className="card_size">COLOR:</p>) : (<></>)}

                    {
                          colorProduct.length > 0
                            ? (
                              <div className="container_colors">
                                {
                          colorProduct[0].items.map((color, key) => (
                            <div className={item.colorSelected === key ? 'chosenColor' : ''} key={color}>
                              <div
                                className="Productcolor"
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
                    <div className="Add_product">
                      <button
                        type="button"
                        className="btn1"
                        onClick={() => this.props.changeNumberInCart('plus', item)}
                      >
                        +
                      </button>
                      <p className="numberOfItems">{item.itemsNumber}</p>
                      <button
                        type="button"
                        className="btn2"
                        onClick={() => this.props.changeNumberInCart('moins', item)}
                      >
                        -
                      </button>
                    </div>
                    <div className="cartImgContainer">
                      <img src={item.gallery[item.imagesDisplay]} alt="" className="cartImg" />
                      <div className="switchButtons">
                        <button
                          type="button"
                          onClick={() => { this.props.changeImage('moins', item); }}
                        >
                          {'<'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { this.props.changeImage('plus', item); }}
                        >
                          {'>'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        }
        <div className="TotalQuantity">
          <h3>
            Tax 21%:
            <span>
              {' '}
              {this.state.currencies[this.props.currencieId]}
              {(this.cartTotal() * 0.21).toFixed(2)}
            </span>
          </h3>
          <h3>
            Quantity:
            <span>
              {' '}
              {this.cartLength()}
            </span>
          </h3>
          <h3>
            Total:
            <span>
              {' '}
              {this.state.currencies[this.props.currencieId]}
              {this.cartTotal().toFixed(2)}
            </span>
          </h3>
          <button type="button" className="orderBtn">ORDER</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
