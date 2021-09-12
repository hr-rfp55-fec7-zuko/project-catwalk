import React from 'react';
import ReactDom from 'react-dom';

const axios = require('axios');
const config = require('/config.js');

class RelatedProductCard extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      productIDInfo: '',
      salePrice: '',
      featuredURL: '/images/default-placeholder.png',
      averageStarRating: ''
    };
  }

  componentDidMount() {
    let APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
    let authorization = { headers: { Authorization: `${config.TOKEN}` } };
    const { productID, parentProductIDInfo } = this.props;

    // axios.get(`/products/?product_id=${productID}`)
    axios.get(`${APIurl}/products/${productID}`, authorization)
      .then(({ data }) => {
        // console.log(data);
        this.setState({
          productIDInfo: data,
          currentProductFeatures: data.features,
        });
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductCard', error);
      });

    //Get the sale price and featureURL
    axios.get(`${APIurl}/products/${productID}/styles`, authorization)
      //axios.get(`/products/?product_id=${productID}&flag=styles`)
      .then(({ data }) => {
        // console.log(data);
        const defaultProduct = data.results.find((product) => product['default?'] === true);
        let url;
        if (!defaultProduct) {
          url = data.results[0].photos[0].thumbnail_url;

          this.setState({
            salePrice: data.results[0].sale_price,
          });
        } else {
          url = defaultProduct.photos[0].thumbnail_url;
          this.setState({
            salePrice: defaultProduct.sale_price,
          });
        }
        if (!url) {
          this.setState({

          });
        } else {
          this.setState({
            featuredURL: url,
          });
        }
      })
      .catch((error) => {
        console.log('Error fetching product styles in relatedProductCard', error);
      });

    // get reviews
    axios.get(`${APIurl}/reviews/?product_id=${productID}&meta=meta`, authorization)
      // axios.get(`/reviews/?product_id=${productID}&meta=meta`)
      .then((results) => {
        console.log(results.data.results.ratings);
      })
      .catch((err) => {
        console.log('error on meta GET request', err);
      });

  }

  render() {
    const { salePrice, featuredURL, productIDInfo, averageStarRating } = this.state;

    return (
      <div className='card' id='{productIDInfo.id}'>
        <div className='pic'>
          <img src={featuredURL} alt={productIDInfo.name} />
        </div>
        <div className='info'>
          <p className='category'>{productIDInfo.category}</p>
          <h3 className='title'><a href='#'>{productIDInfo.name}</a></h3>
          <p className='price'> ${productIDInfo.default_price}</p>
          {salePrice ? <p className='price'> ${salePrice}</p> : null}
          <div className='eviewLink'>*****</div>
        </div>
      </div>
    );
  }
}

export default RelatedProductCard;