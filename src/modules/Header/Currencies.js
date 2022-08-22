import React, { Component } from 'react';
import { connect } from 'react-redux';
import arrow from '../../icons/Vector-currency.png';
import '../../styles/currencies.css';
import { fetchCurrencies } from '../../Redux/currencies/currencies';

class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCurrency: false,
      selected: null,
      active: 0,
    };
  }

  componentDidMount() {
    this.props.fetchCurrencies();
  }

  render() {
    return (
      <div className="currencies-wrap">

        <div
          className="choose-currency"
          onClick={() => this.setState({ showCurrency: !this.state.showCurrency })}
        >
          {' '}
          {
        this.state.selected
          ? (
            <p>{this.state.selected}</p>
          )
          : (
            <p>
              {this.props.currencies.length > 0
                ? this.props.currencies[0].symbol : ''}
            </p>
          )
      }
          <img src={arrow} alt="" className={this.state.showCurrency ? 'arrow' : 'arrow arrow-down'} />
        </div>
        <div className="currencies" style={this.state.showCurrency ? { display: 'flex' } : { display: 'none' }}>
          { this.props.currencies.length > 0
            ? this.props.currencies.map((currency, id) => (
              <p
                className={this.state.active === id ? 'selected-currency' : 'unselsected-curr'}
                onClick={() => {
                  this.setState({
                    showCurrency: false,
                    selected: currency.symbol,
                    active: id,
                  });
                  this.props.selectCurrency(id);
                }}
                key={currency.label}
              >
                {currency.symbol}
                {' '}
                {currency.label}
              </p>
            ))
            : ''}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({ currencies: state.currenciesReducer });
const mapDispatch = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapState, mapDispatch)(Currency);
