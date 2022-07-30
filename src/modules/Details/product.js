import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../Redux/product/product';
import { addTocard } from '../../Redux/cart/cart';
import { changeStoredStatus } from '../../Redux/categories/categories';
import '../../styles/product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPoduct: false,
      imageShown: 0,
      colorSelected: 0,
      sizeSelected: 0,
      productObj: null,
    };
  }

  componentDidMount(){
    // this.props.fetchProduct(window.location.pathname.split('/details/').join(''))
    if(this.props.productId !== null){
      this.props.fetchProduct(this.props.productId);
      localStorage.setItem('detail_id', this.props.productId);
    }else{
      this.props.fetchProduct(localStorage.getItem('detail_id'))
    }
    
  }

  componentDidUpdate(prevProps){
    if(this.props.product !== prevProps.product){
      if(this.props.product !== null){
        localStorage.setItem('product', JSON.stringify(this.props.product))
      }
    }
  }

      addNewToCart = (newProduct) => {
        let cartProduct = newProduct;
        const { colorSelected } = this.state;
        const { sizeSelected } = this.state;
        cartProduct = { ...cartProduct, colorSelected };
        cartProduct = { ...cartProduct, sizeSelected };
        this.props.addTocard(cartProduct);
        this.setState({ colorSelected: null, sizeSelected: null });
        this.props.changeStoredStatus(newProduct.name);
        this.props.showMiniCArt(true);
      }

      render() {
        console.log(this.props.product.product, window.location.pathname.split('/details/').join(''))
        let sizeProduct = [];
        let colorProduct = [];
           
        const newProduct = this.props.product.product;
        
        if (newProduct !== undefined) {
          if (newProduct.attributes.length > 1) {
            colorProduct = newProduct.attributes.filter((size) => size.name === 'Color');
          }
          sizeProduct = newProduct.attributes.filter((size) => size.name !== 'Color');
        }
        console.log("localstorage =>", localStorage.getItem('detail_id'))
        // if(!this.props.showProduct){
        //   this.setState({imageShown: 0});
        // }

        return (
          <div
            className="productShown"
          >
            <div
              onClick={() => this.props.showMiniCArt(false)}
              className={this.props.grayFilter ? 'filter-gray' : 'no-filter'}
            />
            {
        newProduct
          ? (
            <div className="productContainer">
              <div className="sideImages">
                {
                newProduct.gallery.map((pic, id) => (
                  <img
                    key={pic}
                    src={pic}
                    alt=""
                    className="litleImg"
                    onClick={() => this.setState({ imageShown: id })}
                  />
                ))
              }
              </div>
              <div className="bigImgContainer">
                <img src={newProduct.gallery[this.state.imageShown]} alt="" className="bigImage" />
              </div>
              <div className="detailsContainer">
                <h3 id="titleBrand">{newProduct.brand}</h3>
                <h4 id="titlePopUp">{newProduct.name}</h4>
                {sizeProduct.length > 0 ? (<p className="sizeTitle">SIZE:</p>) : (<></>)}

                {sizeProduct.length > 0
                  ? (
                    <div className="sizesContainer">
                      {
                  sizeProduct[0].items.map((size, key) => (
                    <p
                      onClick={() => { this.setState({ sizeSelected: key }); }}
                      className={this.state.sizeSelected === key ? 'chosenSize' : 'productSize'}
                    >
                      {size.value}
                    </p>
                  ))
                }
                    </div>
                  ) : ''}
                {colorProduct.length > 0 ? (<p className="sizeTitle">COLOR:</p>) : (<></>) }

                {
                colorProduct.length > 0 ? (
                  <div className="colorsContainer">
                    {
                   colorProduct[0].items.map((color, key) => (
                     <div
                       onClick={() => { this.setState({ colorSelected: key }); }}
                       className={this.state.colorSelected === key ? 'chosenColor' : 'Productcolor'}
                       style={{ backgroundColor: color.value }}
                     />
                   ))
                  }
                  </div>
                )
                  : (<></>)
               }
                <p 
                  className="detailsPrice"
                >
                  {newProduct.prices[this.props.currencieId].currency.symbol}
                  {newProduct.prices[this.props.currencieId].amount}
                </p>
                <button
                  className="add_to_cart"
                  onClick={() => this.addNewToCart(newProduct)}
                >
                  ADD TO CART
                </button>
                <div
                  className="text-Description"
                  dangerouslySetInnerHTML={{ __html: newProduct.description }}
                />

              </div>
            </div>
          )
          : (<p>...fetching</p>)
}
          </div>
        );
      }
}

const mapStateToProps = (state) => ({ product: state.productReducer });

const mapDispatchToProps = (dispatch) => ({
  addTocard: (product) => dispatch(addTocard(product)),
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  changeStoredStatus: (item) => dispatch(changeStoredStatus(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
