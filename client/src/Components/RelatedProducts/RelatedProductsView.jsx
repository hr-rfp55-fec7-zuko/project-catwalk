import React from 'react';
import ReactDom from 'react-dom';
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
    const { productID } = this.props;
    axios.get('products/40346/related')
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
    const { productID } = this.props;
    return (
      <div className="relatedProducts">
        <h2>Related Products</h2>
        <RelatedProductsList
          productID={productID}
          relatedProducts={relatedProducts}
        />
      </div>
    );
  }
}

export default RelatedProductsView;
