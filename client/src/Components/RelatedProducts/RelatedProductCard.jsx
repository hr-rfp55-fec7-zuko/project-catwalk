import React from 'react';
import ReactDom from 'react-dom';

const axios = require('axios');
const config = require('/config.js');

class RelatedProductCard extends React.Component {
  constructor({props}) {
    super(props);
    //const { parentProductIDInfo } = this.props;
    this.state = {
      productIDInfo: '',
      //parentProductIDInfo,
      salePrice: '',
    };
  }

  componentDidMount() {
    let APIurl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp';
    let authorization = { headers: { Authorization: `${config.TOKEN}` } };
    const { productID, parentProductIDInfo } = this.props;

    // axios.get(`/products/?product_id=${productID}`)
    axios.get(`${APIurl}/products/${productID}`, authorization)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          productIDInfo: data,
          //parentProductFeatures: parentProductIDInfo.features,
          currentProductFeatures: data.features,
          // eslint-disable-next-line react/destructuring-assignment
          //loaded: this.state.loaded + 1,
        });
      })
      .catch((error) => {
        console.log('Error fetching product details in relatedProductCard', error);
      });

    // axios.get(`/products/?product_id=${productID}&flag=styles`)
    //   .then(({ data }) => {
    //     const defaultProduct = data.results.find((product) => product['default?'] === true);
    //     let url;
    //     if (!defaultProduct) {
    //       url = data.results[0].photos[0].thumbnail_url;
    //       this.setState({
    //         salePrice: data.results[0].sale_price,
    //       });
    //     } else {
    //       url = defaultProduct.photos[0].thumbnail_url;
    //       this.setState({
    //         salePrice: defaultProduct.sale_price,
    //       });
    //     }
    //     if (!url) {
    //       this.setState({
    //         loaded: this.state.loaded + 1,
    //         featuredURL: 'https://www.westernheights.k12.ok.us/wp-content/uploads/2020/01/No-Photo-Available.jpg',
    //       });
    //     } else {
    //       this.setState({
    //         loaded: this.state.loaded + 1,
    //         featuredURL: url,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Error fetching product styles in relatedProductCard', error);
    //   });

    // // get reviews
    // axios.get(`/reviews/?product_id=${productID}&meta=meta`)
    //   .then((results) => {
    //     this.setState({
    //       averageStarRating: Number(averageRating(results.data.ratings)),
    //       averageRatingLoaded: true,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log('error on meta GET request', err);
    //   });
  }

  render() {
    const {
      salePrice,
      productIDInfo,
    } = this.state;
    return (
      <div className='card' id='{productIDInfo.id}'>
        <div className='pic'>
          <img src="https://m.media-amazon.com/images/I/41sxUiYQxFL._AC_SR160,200_.jpg" />
        </div>
        <div className='info'>
          <p className='category'>{productIDInfo.category}</p>
          <h3 className='title'><a href='#'>{productIDInfo.name}</a></h3>
          <p className='price'> {salePrice ? salePrice : productIDInfo.default_price}</p>
          <div className='eviewLink'>*****</div>
        </div>
      </div>
    );
  }
}

export default RelatedProductCard;