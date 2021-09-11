import React from 'react';
import ReactDom from 'react-dom';

import RelatedItemsList from './RelatedItemsList.jsx';

const axios = require('axios');
const config = require('/client/config.js');

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RelatedItems: []
    };
  }

  componentDidMount() {
    this.getRelatedItems();
  }

  render() {
    return (
      <div className="relatedItems">
        <h2>Related Products</h2>
        <RelatedItemsList />
      </div>
    );
  }

  getRelatedItems() {
    console.log('Test');
    // axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?ID=40346/related')
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({
    //       RelatedItems: res.data
    //     });
    //     this.render();
    //   });
  }





}

export default RelatedItems;
