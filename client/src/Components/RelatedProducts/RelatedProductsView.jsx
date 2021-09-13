import React from 'react';
import ReactDom from 'react-dom';
import RelatedProductsList from './RelatedProductsList.jsx';

const axios = require('axios');
const config = require('/config.js');

class RelatedProductsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: '40346',
      relatedProducts: []
    };
  }

  componentDidMount() {
    const { productID } = this.props;
    let APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
    let authorization = { headers: { Authorization: `${config.TOKEN}` } };

    axios.get(`${APIurl}/products/40346/related`, authorization)
    //axios.get(`${APIurl}/products/?product_id=${productID}&flag=related`, authorization)
      .then(({ data }) => {
        console.log(data);
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
    const { relatedProducts } = this.state;
    const { productID } = this.state;
    //const { productID } = this.props;
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
