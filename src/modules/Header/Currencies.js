import React, { Component } from 'react';

class Currencie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [
        { s: '$', id: 'USD' },
        { s: '£', id: 'GBP' },
        { s: 'A$', id: 'AUD' },
        { s: '¥', id: 'JPY' },
        { s: '₽', id: 'RUB' },
      ],
      showCurrencie: false,
    };
  }

  render() {
    console.log(this.props);
    return (
      <select
        name="currencies"
        className="currencies"
        onChange={this.props.selectCurrency}
        onMouseOver={() => this.setState({ showCurrencie: true })}
        onMouseLeave={() => this.setState({ showCurrencie: false })}
      >
        {
            this.state.currencies.map((currency) => (
              <option
                value={currency.id}
                key={currency.id}
              >
                {currency.s}
                {' '}
                {this.state.showCurrencie ? currency.id : ''}
              </option>
            ))
          }
      </select>
    );
  }
}

export default Currencie;
