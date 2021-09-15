import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';

const axios = require('axios');

class RelatedProductsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: []
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    axios.get(`http://localhost:3000/products/${productId}/related`)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          relatedProducts: data,
        });
      })
      .catch((error) => {
        console.log('Error getting related data', error);
      });
  }

  render() {
    const { relatedProducts } = this.state;
    const { productId } = this.props;
    return (
      <div className="relatedProducts">
        <h2>Related Products</h2>
        <RelatedProductsList
          productId={productId}
          relatedProducts={relatedProducts}
        />
      </div>
    );
  }
}

export default RelatedProductsView;
