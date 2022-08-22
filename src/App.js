import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Items from './modules/Category/category';
import Cart from './modules/Cart/Cart';
import Header from './modules/Header/header';
import Product from './modules/Details/product';
import { fetchCategories } from './Redux/categories/categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencieId: 0,
      showMiniCArt: false,
      productId: null,
      descriptionLink: null,
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  changHeaderLink = () => {
    this.setState({
      showMiniCArt: false,
    });
  }

  selectCurrency = (id) => {
    this.setState({ currencieId: id });
  }

  seeDetails = (id) => {
    this.setState({ productId: id });
  }

  showMiniCArt = (bool) => {
    this.setState({ showMiniCArt: bool });
  }

  setDescriptionLink = (link) => {
    this.setState({ descriptionLink: link });
    localStorage.setItem('descriptionLink', link);
  }

  render() {
    const savedLink = localStorage.getItem('descriptionLink');
    return (

      <BrowserRouter>
        <Header
          changeFilter={this.changHeaderLink}
          selectCurrency={this.selectCurrency}
          currencieId={this.state.currencieId}
          cartShown={this.state.showMiniCArt}
          showMiniCArt={this.showMiniCArt}
        />
        <Routes>
          <Route
            path="/"
            element={(
              <Items
                filter=""
                currencieId={this.state.currencieId}
                grayFilter={this.state.showMiniCArt}
                hideMiniCart={this.showMiniCArt}
                details={this.seeDetails}
                setDescriptionLink={this.props.setDescriptionLink}
              />
        )}
          />
          {
              this.props.allItems.length > 0
                ? this.props.allItems.map((item) => (
                  <Route
                    key={item.name}
                    path={item.name}
                    element={(
                      <Items
                        filter={item.name}
                        currencieId={this.state.currencieId}
                        grayFilter={this.state.showMiniCArt}
                        hideMiniCart={this.showMiniCArt}
                        details={this.seeDetails}
                        setDescriptionLink={this.setDescriptionLink}
                      />
                  )}
                  />
                ))
                : ''
            }

          <Route
            path={this.state.descriptionLink ? this.state.descriptionLink : savedLink}
            element={(
              <Product
                productId={this.state.productId}
                currencieId={this.state.currencieId}
                showMiniCArt={this.showMiniCArt}
                grayFilter={this.state.showMiniCArt}
              />
                )}
          />
          <Route
            path="/cart"
            element={(
              <Cart
                currencieId={this.state.currencieId}
                cartShown={this.showMiniCArt}
              />
)}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({ allItems: state.categoriesReducer });
const mapDispatch = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatch)(App);
