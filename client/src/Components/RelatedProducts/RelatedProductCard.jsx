import React from 'react';
import axios from 'axios';

import AvgRatingStars from '../RatingsAndReviews/helpers/AvgRatingStars.jsx';
import AverageRating from './helpers/AverageRating.js';
import ComparisonModal from './ComparisonModal.jsx';

class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    const { parentProductIdInfo } = this.props;
    this.state = {
      productIdInfo: '',
      parentProductIdInfo,
      featuredURL: '',
      openCompareModal: false,
      parentProductFeatures: '',
      comparedFeatures: '',
      salePrice: '',
      avgRating: '',
      rating: '',
    };

    this.handleCompareClick = this.handleCompareClick.bind(this);
    this.compareFeatures = this.compareFeatures.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.fetchAPIProduct = this.fetchAPIProduct.bind(this);
  }

  componentDidMount() {
    this.fetchAPIProduct();
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (prevProps.productId !== productId) {
      this.fetchAPIProduct();
    }
  }

  fetchAPIProduct() {
    const { productId, parentProductIdInfo } = this.props;
    const { currentProductFeatures, parentProductFeatures, rating, avgRating } = this.state;
    axios.get(`/products/${productId}`)
      .then(({ data }) => {
        this.setState({
          productIdInfo: data,
          parentProductFeatures: parentProductIdInfo.features,
          currentProductFeatures: data.features,
        });

      })
      .catch((err) => {
        console.log('Error geting products detail in a relatived product', err);
      });

    // Get the feature picture and price for a related product
    axios.get(`/products/${productId}/styles`)
      .then(({ data }) => {
        const defaultProduct = data.find((product) => product['default?'] === true);
        let url;

        if (!defaultProduct) {
          url = data[0].photos[0].thumbnail_url;
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

    axios({ url: `/reviews/meta?product_id=${productId}`, method: 'GET' })
      .then((results) => this.setState({ rating: results.data.ratings }))
      .catch((error) => console.log('ERROR in METADATA AJAX Request: ', error));
  }

  changeProduct(event) {
    event.preventDefault();
    this.props.updateProductID(this.props.productId);
  }

  handleCompareClick() {
    const { openCompareModal, parentProductFeatures, currentProductFeatures } = this.state;
    this.setState({
      openCompareModal: !openCompareModal,
    });
    this.compareFeatures(parentProductFeatures, currentProductFeatures);
  }

  compareFeatures(parentFeature, productFeature) {
    // let combinedObj = parentFeature.concat(productFeature);
    let combinedFeatures = parentFeature.concat(productFeature);
    let output = [];
    let obj = {};
    combinedFeatures.forEach(item => {
      let obj1 = {};
      if (!obj[item.value]) {
        obj[item.feature] = item.value;
        obj1['feature'] = item.feature;
        obj1['value'] = item.value;
        output.push(obj1);
      }
    });
    this.setState({
      comparedFeatures: output,
    });
  }

  render() {
    const { productIdInfo, featuredURL, salePrice, openCompareModal, comparedFeatures, parentProductIdInfo, rating } = this.state;
    const sale = { textDecoration: salePrice ? 'line-through' : 'none' };

    return (
      <React.Fragment>
        <div className='cardWrapper'>
          <div className='card' id={productIdInfo.id}>
            <div className='CompareButton' onClick={this.handleCompareClick}><i className="far fa-star"></i></div>
            <div className='containerCard' onClick={this.changeProduct}>
              <div className='pic'>
                <img src={featuredURL} alt={productIdInfo.name}></img>
              </div>
              <div className='info'>
                <p className='category'>{productIdInfo.category}</p>
                <h3 className='title' >{productIdInfo.name}</h3>
                <p><span style={sale}>${productIdInfo.default_price}</span>{salePrice ? <span className='salePrice'> ${salePrice}</span> : null}</p>
                <AvgRatingStars avgRating={AverageRating(rating)}/>
              </div>
            </div>
          </div>
        </div>
        {openCompareModal && (
          <div>
            <ComparisonModal
              closeModal={this.handleCompareClick}
              parentProduct={parentProductIdInfo}
              compareProduct={productIdInfo}
              comparedFeatures={comparedFeatures}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default RelatedProductCard;