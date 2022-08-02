import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../Redux/categories/categories';
import Item from './Item/Item';
import '../../styles/Items.css';

class Items extends Component {
  componentDidMount() {
    if (this.props.allItems.length === 0) {
      this.props.fetchCategories();
    }
  }

  render() {
    return (
      <div className="showItems">
        <div
          onMouseOver={() => this.props.hideMiniCart(false)}
          className={this.props.grayFilter ? 'filter-gray' : 'no-filter'}
        />
        {
          this.props.allItems.length > 0
            ? (
              <h2
                className="categoryName"
              >
                {this.props.allItems[this.props.filter].name}
              </h2>
            ) : ''
}
        <div className="Items_container">

          { this.props.allItems.length > 0
            ? this.props.allItems[this.props.filter].products.map((item) => (
              <Item
                productId={this.props.details}
                currencieId={this.props.currencieId}
                storedInCart={item.storedInCart}
                data={item}
                key={item.id}
              />
            )) : (<p>...fetching data</p>)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ fetchCategories: () => dispatch(fetchCategories()) });

const mapStateToProps = (state) => ({ allItems: state.categoryReducer });

export default connect(mapStateToProps, mapDispatchToProps)(Items);
