import React from 'react';
import ReactDom from 'react-dom';
import RelatedProductCard from './RelatedProductCard.jsx';

const axios = require('axios');

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIDInfo: '',
    };
  }

  componentDidMount() {
    // const { productID } = this.props;
    // axios.get(`/products/${productID}`)
    //   .then(({ data }) => {
    //     this.setState({
    //       parentProductIDInfo: data,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('Error getting product details in relatedProductsList', error);
    //   });
  }

  render() {
    // const { parentProductIDInfo, relatedProducts } = this.state;
    // const { productID } = this.props;
    return (
      <div className='RelatedProductsList'>
        <RelatedProductCard />
      </div>
    );
  }
}

export default RelatedProductsList;