import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style
    };
    this.setSKU = this.setSKU.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  setSKU(sku) {
    this.setState({
      selectedSKU: sku,
      selectedSize: this.state.style.skus[sku].size,
      totalQuantity: this.state.style.skus[sku].quantity
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
          <SizeSelector skus={this.state.style.skus} setSKU={this.setSKU} />
          <QuantitySelector totalQuantity={this.state.totalQuantity} setQuantity={this.setQuantity} />
        </div>
        <button onClick={this.handleAddToCart} >Add to Cart</button>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.style !== prevProps.style) {
      this.setState({ style: this.props.style });
      if (this.state.selectedSKU || this.state.style.skus) {
        var skuArr = Object.keys(this.props.style.skus);
        for (var i = 0; i < skuArr.length; i++) {
          if (this.props.style.skus[skuArr[i]].size === this.state.selectedSize ) {
            console.log(this.props.style.skus[skuArr[i]].quantity);
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