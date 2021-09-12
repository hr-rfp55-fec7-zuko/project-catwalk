import React from 'react';
import ReactDom from 'react-dom';

import RelatedProductsList from './relatedProductsList.jsx';

const axios = require('axios');
const config = require('/config.js');

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: []
    };
  }

  componentDidMount() {
    const { productID } = this.props;
    axios.get(`/products/?product_id=${productID}&flag=related`)
      .then(({ data }) => {
        const related = new Set();
        data.forEach((element) => {
          related.add(element);
        });
        const cleanData = Array.from(related);
        this.setState({
          relatedProducts: cleanData,
        });
      })
      .catch((error) => {
        console.log('Error getting related data in relatedProductsMainView', error);
      });
  }

  render() {
    const
    return (
      <div className="relatedItems">
        <h2>Related Products</h2>
        <relatedProductsList relatedProducts={this.state.relatedProducts} />
      </div>
    );
  }

  // getRelatedItems() {
  //   // let endPoint = window.location.href;
  //   // endPoint.split('/');
  //   let link = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products';
  //   let itemId = '40346';
  //   let options = {
  //     headers: {
  //       Authorization: `${config.TOKEN}`
  //     }
  //   };
  //   axios.get(`${link}/${itemId}/related`, options)
  //     .then(res => {
  //       let dataArr = [];
  //       console.log(res.data);
  //       for (let key of res.data) {
  //         axios.get(`${link}/${key}`, options)
  //           .then(res => {
  //             return dataArr.push(res.data);
  //           });
  //       }
  //       this.setState({RelatedItems: dataArr});
  //       this.render();
  //     });
  // }

}

export default RelatedItems;
