import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../Redux/category/category';
import { addTocard } from '../../Redux/cart/cart';
import Item from './Item/Item';
import '../../styles/Items.css';

class Items extends Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.filter);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.fetchCategory(this.props.filter);
    }
  }

  render() {
    return (
      <div className="showItems">
        <div
          onClick={() => this.props.hideMiniCart(false)}
          className={this.props.grayFilter ? 'filter-gray' : 'no-filter'}
        />
        {
          this.props.allItems
            ? (
              <>
                <h2 className="categoryName">{this.props.allItems.name}</h2>
                <div className="Items_container">

                  { this.props.allItems.products.map((item) => (
                    <Item
                      productId={this.props.details}
                      currencieId={this.props.currencieId}
                      addToCart={this.props.addTocard}
                      data={item}
                      key={item.id}
                      hideMiniCart={this.props.hideMiniCart}
                      setDescriptionLink={this.props.setDescriptionLink}
                      categoryName={this.props.allItems.name}
                    />
                  ))}
                </div>
              </>
            )
            : (<p>...processing</p>)
}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  fetchCategory: (name) => dispatch(fetchCategory(name)),
  addTocard: (item) => dispatch(addTocard(item)),
});

const mapState = (state) => ({ allItems: state.categoryReducer.category });

export default connect(mapState, mapDispatch)(Items);
