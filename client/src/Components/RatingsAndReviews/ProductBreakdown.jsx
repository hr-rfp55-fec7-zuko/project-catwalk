import React from 'react';
import ProductBar from './helpers/ProductBar.jsx';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    // let characteristics = this.props.characteristics;

    // let characteristicBars = [];

    // for (var characteristic in characteristics) {
    //   characteristicBars.push(
    //     <div className='characteristic-breakdown' data-testid="characteristic-breakdown">
    //       {characteristic}
    //       <div className='characteristic-bar-outer'>Bar Here: {characteristics[characteristic].value}</div>
    //       <span>label low</span> <span>label high</span>
    //     </div>
    //   );
    // }

    let characteristic = 'Size';
    let score = 4;


    //NOTE: NEED 1 BAR FOR EACH - MAP
    return (
      <div className="product-breakdown">
        <h3>Product Breakdown</h3>
        <ProductBar key={characteristic} characteristic={characteristic} score={4}/>
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