import React from 'react';

//Receives meta-data object from index.js
class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-breakdown">
        <h3>Product Breakdown</h3>
      </div>
    );
  }
}

export default ProductBreakdown;