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
      <div className='po-add-cart'>
        <div className='select-menus'>
          <SizeSelector />
          <QuantitySelector />
        </div>
        <button>Add to Cart</button>
      </div>
    );
  }
}

export default AddToCart;