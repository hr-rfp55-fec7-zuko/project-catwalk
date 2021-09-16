import React from 'react';
import ProductBar from './helpers/ProductBar.jsx';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let characteristics = this.props.characteristics;

    let characteristicTuples = [];



    for (var characteristic in characteristics) {
      characteristicTuples.push([characteristic, characteristics[characteristic].value, characteristic, characteristics[characteristic].id]);
    }

    return (
      <div className="product-breakdown">
        <h3>Product Breakdown</h3>
        {characteristicTuples.map((tuple) => <ProductBar key={tuple[3]} characteristic={tuple[0]} score={tuple[1]}/>)}
      </div>
    );
  }
}

export default ProductBreakdown;



/*

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let characteristics = this.props.characteristics;

    let characteristicBars = [];

    for (var characteristic in characteristics) {
      characteristicBars.push(
        <div className='characteristic-breakdown' data-testid="characteristic-breakdown">
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

*/