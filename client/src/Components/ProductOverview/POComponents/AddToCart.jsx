import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.setSKU = this.setSKU.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  setSKU(sku) {
    this.setState({
      selectedSKU: sku,
      totalQuantity: this.props.style.skus[sku].quantity
    });
  }

  setQuantity(quantity) {
    this.setState({quantity});
  }

  handleAddToCart(e) {
    e.preventDefault();
    var cartItem = {
      'sku_id': this.state.selectedSKU,
      count: this.state.quantity
    };
    console.log('you want to add to cart:', cartItem);
  }

  render() {
    return (
      <div className='po-add-cart'>
        <div className='select-menus'>
          <SizeSelector skus={this.props.style.skus} setSKU={this.setSKU} />
          <QuantitySelector totalQuantity={this.state.totalQuantity} setQuantity={this.setQuantity} />
        </div>
        <button onClick={this.handleAddToCart} >Add to Cart</button>
      </div>
    );
  }
}

export default AddToCart;