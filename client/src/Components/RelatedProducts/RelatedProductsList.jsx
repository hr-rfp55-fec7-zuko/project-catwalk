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


  render() {
    return (
      <div className='RelatedProductsList'>
        <RelatedProductCard />
      </div>
    );
  }
}

export default RelatedProductsList;