import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyCart from '../../icons/Empty Cart.png';
import logo from '../../icons/logo transparent.png';
import Currency from './Currencies';
import Minicart from './minicart';
import '../../styles/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: 0,
    };
  }

  cartLength = () => {
    let cartlength = 0;
    this.props.cart.forEach((item) => {
      cartlength += item.itemsNumber;
    });
    return cartlength;
  }

  render() {
    if (window.location.pathname.split('/').join('') === 'cart') {
      this.props.showMiniCArt(false);
    }

    return (
      <header>
        <nav className="nav">
          {
            this.props.allItems.length > 0
              ? this.props.allItems.map((item, key) => (
                <Link
                  key={item.name}
                  to={`../${item.name}`}
                  className={this.state.activeLink === key ? 'activeLink' : 'nonActiveLink'}
                  onClick={() => {
                    this.setState({ activeLink: key });
                    this.props.changeFilter();
                  }}
                >
                  {item.name}
                </Link>
              ))
              : ''
          }
        </nav>
        <img
          src={logo}
          alt=""
          className="logo"
          onClick={() => {
            this.setState({ activeLink: 0 });
            this.props.changeFilter();
          }}
        />
        <Currency selectCurrency={this.props.selectCurrency} minicart={this.props.showMiniCArt} />
        <img
          src={emptyCart}
          alt=""
          className="cardEmpty"
          onClick={() => this.props.showMiniCArt(true)}
        />

        <span
          style={this.cartLength() === 0 ? { display: 'none' } : { display: 'block' }}
          className="cartLength"
        >
          {this.cartLength()}
        </span>
        <Minicart
          showMiniCArt={this.props.showMiniCArt}
          currencieId={this.props.currencieId}
          cartShown={this.props.cartShown}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({ cart: state.cartReducer, allItems: state.categoriesReducer });

export default connect(mapStateToProps, null)(Header);
