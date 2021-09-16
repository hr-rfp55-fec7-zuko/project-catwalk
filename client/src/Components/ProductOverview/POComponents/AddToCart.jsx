import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import axios from 'axios';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      addedToCart: false
    };
    this.setSKU = this.setSKU.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  setSKU(sku) {
    this.setState({
      selectedSKU: sku,
      selectedSize: this.state.style.skus[sku].size,
      totalQuantity: this.state.style.skus[sku].quantity,
      addedToCart: false
    });
    if (this.state.quantity || this.state.style.skus[sku].quantity < this.state.quantity) {
      var quantity = (this.state.style.skus[sku].quantity > 0) ? 1 : 0;
      this.setState({quantity});
    }
  }

  setQuantity(quantity) {
    this.setState({quantity, addedToCart: false});
  }

  handleAddToCart(e) {
    e.preventDefault();
    if (this.state.selectedSKU || this.state.quantity <= this.state.totalQuantity) {
      var cartItem = {
        'sku_id': this.state.selectedSKU,
      };
      for (var i = 0; i < this.state.quantity; i++) {
        axios.post('http://localhost:3000/cart/', cartItem);
      }
      this.setState({
        addedToCart: true
      });
    } else {

    }
  }

  render() {
    return (
      <div className='po-add-cart'>
        <div className='select-menus'>
          <SizeSelector skus={this.state.style.skus} setSKU={this.setSKU} />
          <QuantitySelector totalQuantity={this.state.totalQuantity} setQuantity={this.setQuantity} />
        </div>
        <button onClick={this.handleAddToCart} >Add to Cart</button>
        {this.state.addedToCart ? `You added ${this.state.quantity} items to your cart!` : null }
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.style !== prevProps.style) {
      this.setState({ style: this.props.style, addedToCart: false });
      if (this.state.selectedSKU || this.state.style.skus) {
        var skuArr = Object.keys(this.props.style.skus);
        for (var i = 0; i < skuArr.length; i++) {
          if (this.props.style.skus[skuArr[i]].size === this.state.selectedSize ) {
            this.setState({
              selectedSKU: skuArr[i],
              totalQuantity: this.props.style.skus[skuArr[i]].quantity
            });
          }
        }
      }
    }
  }
}

export default AddToCart;