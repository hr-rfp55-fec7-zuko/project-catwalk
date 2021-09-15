import React from 'react';
import axios from 'axios';

class RelatedProductCard extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      productIDInfo: '',
      featuredURL: '',
      salePrice: ''
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    // Get the information for a related product
    axios.get(`/products/${productId}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          productIDInfo: data,
        });
      })
      .catch((err) => {
        console.log('Error geting products detail in a relatived product', err);
      });

    // Get the feature picture and price for a related product
    axios.get(`/products/${productId}/styles`)
      .then(({ data }) => {
        console.log(data);
        const defaultProduct = data.find((product) => product['default?'] === false);
        let url;
        if (!defaultProduct) {
          url = data.photos[0].thumbnail_url;
          this.setState({
            salePrice: data.sale_price,
          });
        } else {
          url = defaultProduct.photos[0].thumbnail_url;
          this.setState({
            salePrice: defaultProduct.sale_price,
          });
        }
        if (!url) {
          this.setState({
            featuredURL: '/images/default-placeholder.png',
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
  }
  render() {
    const { productIDInfo, featuredURL, salePrice, urlFeaturePic } = this.state;
    const { relatedProducts, productID } = this.props;
    return (
      <div className='card' id={productIDInfo.id}>
        <div className='CompareButton'><i className="far fa-star"></i></div>
        <div className='pic'>
          <img src={featuredURL} alt={productIDInfo.name}></img>
        </div>
        <div className='info'>
          <p className='category'>{productIDInfo.category}</p>
          <h3 className='title'>{productIDInfo.name}</h3>
          <p className='price'>${productIDInfo.default_price}</p>
          {salePrice ? <p className='price sale'>{salePrice}</p> : null}
          <div className='reviewLink'>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <i className="far fa-star"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedProductCard;