import React from 'react';






//Receives meta-data object from index.js
class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let characteristics = this.props.characteristics;

    let characteristicBars = [];

    for (var characteristic in characteristics) {
      characteristicBars.push(
        <div className='characteristic-breakdown'>
          {characteristic}
          <div className='characteristic-bar-outer'>Bar Here: {characteristics[characteristic].value}</div>
          <span>label low</span> <span>label high</span>
        </div>
      );
    }

    return (
      <div className="product-breakdown">
        <h3>Product Breakdown</h3>
        {characteristicBars}
      </div>
    );
  }
}

export default ProductBreakdown;