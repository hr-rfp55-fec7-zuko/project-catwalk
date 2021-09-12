import React from 'react';
import ReactDom from 'react-dom';
import RelatedProductCard from './RelatedProductCard.jsx';

const axios = require('axios');
const config = require('/config.js');

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIDInfo: '',
    };
  }

  componentDidMount() {
    let APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
    let authorization = { headers: { Authorization: `${config.TOKEN}` } };

    const { productID } = this.props;

    axios.get(`${APIurl}/products/${productID}`, authorization)
      // axios.get(`/products/?product_id=${productID}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          parentProductIDInfo: data,
        });
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductsList', error);
      });
  }

  render() {
    const { parentProductIDInfo} = this.state;
    const { relatedProducts, productID } = this.props;
    if (parentProductIDInfo.length === 0) {
      return (
        null
      );
    }
    return (
      <div className='RelatedProductsList'> {
        relatedProducts.map((product) => (
          <RelatedProductCard
            parentProductID={productID}
            productID={product}
            parentProductIDInfo={parentProductIDInfo}
            key={product}
          />
        ))
      }
      </div>
    );
  }
}

export default RelatedProductsList;