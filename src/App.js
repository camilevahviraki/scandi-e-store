import React, {Component} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Items from './modules/Categories/categories';
import Cart from './modules/Cart/Cart';
import Header from './modules/Header/header';
import Product from './modules/Details/product';
import store from './Redux/Store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencieId: 0,
      showMiniCArt: false,
      productId: null,
      cartShown: false,
    };
  }

  changHeaderLink = () => {
    this.setState({
      showMiniCArt: false,
    });
  }

  selectCurrency = (e) => {
    switch (e.target.value) {
      case 'USD':
        return this.setState({ currencieId: 0 });
      case 'GBP':
        return this.setState({ currencieId: 1 });
      case 'AUD':
        return this.setState({ currencieId: 2 });
      case 'JPY':
        return this.setState({ currencieId: 3 });
      case 'RUB':
        return this.setState({ currencieId: 4 });
      default:
        return this.setState({ currencieId: 0 });
    }
  }

  seeDetails = (id) => {
    this.setState({productId: id})
    console.log(id);
  }

  showMiniCArt = (bool) => {
    this.setState({showMiniCArt: bool})
  }

  // cartShown = (bool) => {
  //   this.setState({cartShown: bool});
  // }
  

  render() {
    console.log("show mini cart", this.state.showMiniCArt)
    console.log(this.state.productId)
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Header
        changeFilter={this.changHeaderLink}
        selectCurrency={this.selectCurrency}
        currencieId={this.state.currencieId}
        cartShown={this.state.showMiniCArt}
        showMiniCArt={this.showMiniCArt}
      />
      <Routes>
        <Route path="/" element={
          <Items
            filter={0}
            currencieId={this.state.currencieId}
            grayFilter={this.state.showMiniCArt}
            hideMiniCart={this.showMiniCArt}
            details={this.seeDetails}
          />} />
        <Route path="/clothes" element={
          <Items
            filter={1}
            currencieId={this.state.currencieId}
            grayFilter={this.state.showMiniCArt}
            hideMiniCart={this.showMiniCArt}
            details={this.seeDetails}
          />} />
        <Route path="/tech" element={
          <Items
            filter={2}
            currencieId={this.state.currencieId}
            grayFilter={this.state.showMiniCArt}
            hideMiniCart={this.showMiniCArt}
            details={this.seeDetails}
          />} />
        <Route path="details" element={
                  <Product
                  productId={this.state.productId}
                  currencieId={this.state.currencieId}
                  showMiniCArt={this.showMiniCArt}
                  grayFilter={this.state.showMiniCArt}
                />
        } />
        <Route path="/cart" element={<Cart 
          currencieId={this.state.currencieId}
          cartShown={this.showMiniCArt}
        />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}
}

export default App;
