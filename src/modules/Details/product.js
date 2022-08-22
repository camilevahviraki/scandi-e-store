import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../Redux/product/product';
import { addTocard } from '../../Redux/cart/cart';
import Description from './description';
import '../../styles/product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageShown: 0,
      colorSelected: 0,
      sizeSelected: 0,
      sizeSelected0: 0,
      sizeSelected1: 0,
      sizeSelected2: 0,
      message: '',
    };
  }

  componentDidMount() {
    if (this.props.productId !== null) {
      this.props.fetchProduct(this.props.productId);
      localStorage.setItem('detail_id', this.props.productId);
    } else {
      this.props.fetchProduct(localStorage.getItem('detail_id'));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      if (this.props.product !== null) {
        localStorage.setItem('product', JSON.stringify(this.props.product));
        this.saveToStorage(this.props.product.product, 0, 0);
      }
    }
  }

  addNewToCart = (newProduct) => {
    if (newProduct.inStock) {
      let cartProduct = newProduct;
      const { colorSelected } = this.state;
      const { sizeSelected0 } = this.state;
      const { sizeSelected1 } = this.state;
      const { sizeSelected2 } = this.state;
      cartProduct = {
        ...cartProduct,
        colorSelected,
        sizeSelected0,
        sizeSelected1,
        sizeSelected2,
      };
      this.props.addTocard(cartProduct);
      this.props.changeStoredStatus(newProduct.name);
      this.props.showMiniCArt(true);
    } else {
      this.setState({
        message:
        (<span id="message">This product is actually out of stock!</span>),
      });
    }
  };

  saveToStorage = (newProduct, color, size) => {
    let cartProduct = newProduct;
    const colorSelected = color;
    const sizeSelected0 = size;
    const sizeSelected1 = size;
    const sizeSelected2 = size;
    cartProduct = {
      ...cartProduct,
      colorSelected,
      sizeSelected0,
      sizeSelected1,
      sizeSelected2,
    };
    localStorage.setItem('productToCheck', JSON.stringify(cartProduct));
  };

  render() {
    let sizeProduct = [];
    let colorProduct = [];
    const newProduct = this.props.product.product;

    if (newProduct !== undefined) {
      if (newProduct.attributes.length > 1) {
        colorProduct = newProduct.attributes.filter(
          (size) => size.name === 'Color',
        );
      }
      sizeProduct = newProduct.attributes.filter(
        (size) => size.name !== 'Color',
      );
    }
    return (
      <div className="productShown">
        <div
          onClick={() => this.props.showMiniCArt(false)}
          className={this.props.grayFilter ? 'filter-gray' : 'no-filter'}
        />
        {newProduct ? (
          <div className="productContainer">
            <div className="sideImages">
              {newProduct.gallery.map((pic, id) => (
                <img
                  key={pic}
                  src={pic}
                  alt=""
                  className="litleImg"
                  onClick={() => this.setState({ imageShown: id })}
                />
              ))}
            </div>
            <div className="bigImgContainer">
              <img
                src={newProduct.gallery[this.state.imageShown]}
                alt=""
                className="bigImage"
              />
            </div>
            <div className="detailsContainer">
              <h3 id="titleBrand">{newProduct.brand}</h3>
              <h4 id="titlePopUp">{newProduct.name}</h4>

              {sizeProduct.length > 0 ? sizeProduct.map((child, i) => (
                (
                  <>
                    <p className="sizeTitle">
                      {sizeProduct[i].id}
                      :
                    </p>
                    <div className="sizesContainer" key={child}>

                      {sizeProduct[i].items.map((size, key) => (
                        <p
                          key={size}
                          onClick={() => {
                            this.setState({ sizeSelected: key });
                            this.setState({ [`sizeSelected${i}`]: key });
                            this.saveToStorage(
                              newProduct,
                              this.state.colorSelected,
                              key,
                            );
                          }}
                          className={
                          this.state[`sizeSelected${i}`] === key
                            ? 'chosenSize'
                            : 'productSize'
                        }
                        >
                          {size.value}
                        </p>
                      ))}
                    </div>
                  </>
                )
              ))
                : ('')}

              {colorProduct.length > 0 ? (
                <>
                  <p className="sizeTitle">
                    {colorProduct[0].id}
                    :
                  </p>
                  <div className="colorsContainer">
                    {colorProduct[0].items.map((color, key) => (
                      <div
                        key={color}
                        onClick={() => {
                          this.setState({ colorSelected: key });
                          this.saveToStorage(
                            newProduct,
                            key,
                            this.state.sizeSelected0,
                          );
                        }}
                        className={
                        this.state.colorSelected === key
                          ? 'chosenColor'
                          : 'Productcolor'
                      }
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
              <p className="detailsPrice">
                {newProduct.prices[this.props.currencieId].currency.symbol}
                {newProduct.prices[this.props.currencieId].amount.toFixed(2)}
              </p>
              <button
                type="button"
                className="add_to_cart"
                onClick={() => this.addNewToCart(newProduct)}
              >
                ADD TO CART
              </button>
              {this.state.message}
              <Description description={newProduct.description} />
            </div>
          </div>
        ) : (
          <p>...fetching</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ product: state.productReducer });

const mapDispatchToProps = (dispatch) => ({
  addTocard: (product) => dispatch(addTocard(product)),
  fetchProduct: (id) => dispatch(fetchProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
