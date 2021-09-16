import React from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

const axios = require('axios');

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIdInfo: ''
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    axios.get(`/products/${productId}`)
      .then(({ data }) => {
        this.setState({
          parentProductIdInfo: data,
        });
      })
      .catch(err => {
        console.log('Error getting the product detail', err);
      });
  }

  render() {
    const { parentProductIdInfo } = this.state;
    const { relatedProducts, productId } = this.props;
    if (parentProductIdInfo.length === 0) {
      return (
        null
      );
    }
    return (
      <div className='RelatedProductsList' id="productCarousel">
        {relatedProducts.map((product) => (
          <RelatedProductCard
            parentProductId={productId}
            productId={product}
            parentProductIdInfo={parentProductIdInfo}
            key={product}
          />
        ))}
      </div>
    );

  }
}

export default RelatedProductsList;