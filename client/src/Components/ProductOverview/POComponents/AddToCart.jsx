import React from 'react';
import SizeSelector from './SizeSelector.jsx';
import QuantitySelector from './QuantitySelector.jsx';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id='po-add-cart'>
        <SizeSelector />
        <QuantitySelector />
        <button>Add to Cart</button>
      </div>
    );
  }
}

export default AddToCart;