import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import storedCart from '../../../icons/Vector.png';

export default class Item extends Component {
  render() {
    const item = this.props.data;
    return (
      <article
        className={item.storedInCart ? 'artcicle article-stored' : 'artcicle'}
      >
        <div className="image-container" onClick={() => this.props.productId(item.id)}>
          <Link to="../details">
            <img className="Item-Img" src={item.gallery[0]} alt="" />
          </Link>
        </div>
        <h3 className="artcicleName">
          {item.brand}
          {' '}
          {item.name}
        </h3>
        <p className="artciclePrice">
          {item.prices[this.props.currencieId].currency.symbol}
          {item.prices[this.props.currencieId].amount}
        </p>
        <div className={item.storedInCart ? 'storedInCart' : 'non-storedInCArt'}>
          <img src={storedCart} alt="" className="storedCart" />
        </div>

      </article>
    );
  }
}
