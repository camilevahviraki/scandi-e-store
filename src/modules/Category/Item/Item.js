import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import greenCart from '../../../icons/Vector.png';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  addToCart = (item) => {
    if (item.inStock) {
      const newItem = {
        ...item,
        colorSelected: 0,
        sizeSelected0: 0,
        sizeSelected1: 0,
        sizeSelected2: 0,
      };
      this.props.addToCart(newItem);
      this.props.hideMiniCart(true);
    }
  }

  render() {
    const item = this.props.data;
    return (
      <article
        onMouseOver={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        className={this.state.hover ? 'artcicle article-stored' : 'artcicle'}
      >
        <div className="image-container" onClick={() => this.props.productId(item.id)}>
          <Link to={item.id} onClick={() => this.props.setDescriptionLink(`${this.props.categoryName}/${item.id}`)}>
            <img className="Item-Img" src={item.gallery[0]} alt="" />
          </Link>
          <p
            style={!item.inStock ? { display: 'flex' } : { display: 'none' }}
            className="out_of_stock"
          >
            OUT OF STOCK
          </p>
        </div>
        <h3 className="artcicleName">
          {item.brand}
          {' '}
          {item.name}
        </h3>
        <p className="artciclePrice">
          {item.prices[this.props.currencieId].currency.symbol}
          {item.prices[this.props.currencieId].amount.toFixed(2)}
        </p>
        <div className={this.state.hover ? 'storedInCart' : 'non-storedInCArt'}>
          <img
            src={greenCart}
            alt=""
            className="storedCart"
            onClick={() => this.addToCart(item)}
          />
        </div>
      </article>
    );
  }
}
