import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.setSKU = this.setSKU.bind(this);
  }

  setSKU(sku) {
    this.setState({
      selectedSKU: sku,
      quantity: this.props.style.skus[sku].quantity
    });
  }

  render() {
    return (
      <div className='po-add-cart'>
        <div className='select-menus'>
          <SizeSelector skus={this.props.style.skus} setSKU={this.setSKU} />
          <QuantitySelector />
        </div>
        <button>Add to Cart</button>
      </div>
    );
  }
}

export default AddToCart;