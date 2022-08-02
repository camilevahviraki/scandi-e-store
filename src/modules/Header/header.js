import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyCart from '../../icons/Empty Cart.png';
import logo from '../../icons/logo transparent.png';
import Currencie from './Currencies';
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
          <Link
            to="../"
            className={this.state.activeLink === 0 ? 'activeLink' : 'nonActiveLink'}
            onClick={() => {
              this.setState({ activeLink: 0 });
              this.props.changeFilter();
            }}
          >
            All
          </Link>
          <Link
            to="../clothes"
            className={this.state.activeLink === 1 ? 'activeLink' : 'nonActiveLink'}
            onClick={() => {
              this.setState({ activeLink: 1 });
              this.props.changeFilter();
            }}
          >
            Clothes
          </Link>
          <Link
            to="../tech"
            className={this.state.activeLink === 2 ? 'activeLink' : 'nonActiveLink'}
            onClick={() => {
              this.setState({ activeLink: 2 });
              this.props.changeFilter();
            }}
          >
            Tech
          </Link>
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
        <Currencie selectCurrency={this.props.selectCurrency} />
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

const mapStateToProps = (state) => ({ cart: state.cartReducer });

export default connect(mapStateToProps, null)(Header);
