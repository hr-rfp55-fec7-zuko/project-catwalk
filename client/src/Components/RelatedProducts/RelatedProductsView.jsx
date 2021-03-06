import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx';

const axios = require('axios');

class RelatedProductsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: []
    };

    this.fetchAPI = this.fetchAPIRelatedProduct.bind(this);
  }

  componentDidMount() {
    const { productId } = this.props;
    this.fetchAPIRelatedProduct();
  }


  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (prevProps.productId !== this.props.productId) {
      this.fetchAPIRelatedProduct();
    }
  }

  fetchAPIRelatedProduct() {
    const { productId } = this.props;
    axios.get(`/products/${productId}/related`)
      .then(({ data }) => {
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
          updateProductID={this.props.updateProductID}

        />
      </div>
    );
  }
}

export default RelatedProductsView;
