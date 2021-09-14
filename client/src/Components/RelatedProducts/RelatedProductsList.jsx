import React from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

const axios = require('axios');

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentProductIDInfo: '',
    };
  }

  render() {
    const { parentProductIDInfo } = this.state;
    const { productId, relatedProducts } = this.props;
    return (
      <div className='RelatedProductsList'>
        {relatedProducts.map((product, index) => (
          <RelatedProductCard
            parentProductID={productId}
            productId={product}
            key={product}
          />
        ))}
      </div>
    );

  }
}

export default RelatedProductsList;