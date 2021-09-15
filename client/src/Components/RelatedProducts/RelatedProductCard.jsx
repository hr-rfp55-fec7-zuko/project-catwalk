import React from 'react';
import axios from 'axios';
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
      compareFeatures: '',
      salePrice: '',
    };

    this.handleCompareClick = this.handleCompareClick.bind(this);
    this.compareFeatures = this.compareFeatures.bind(this);
  }

  componentDidMount() {
    const { productId, parentProductIdInfo } = this.props;

    // Get the information for a related product
    axios.get(`/products/${productId}`)
      .then(({ data }) => {
        //console.log(data);
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
        // console.log(data);
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

  handleCompareClick() {
    const { openCompareModal } = this.state;
    this.setState({
      openCompareModal: !openCompareModal,
    });
    //this.compareFeatures(parentProductFeatures, currentProductFeatures);
  }

  compareFeatures(parentFeature, productFeature) {
    let compareFeatures = {};
    console.log('this is a list of features');
    // parentFeature.forEach(() => {

    // });
    // parentFeature
    // go though each of the feature
    // if not exit compareFeatures
    // if it is null
    // add '✔️'
    // add value

  }

  render() {
    //this.compareFeatures(parentProductFeatures, currentProductFeatures);
    const { productIdInfo, featuredURL, salePrice, urlFeaturePic, openCompareModal, compareFeatures, parentProductIdInfo} = this.state;
    return (
      <div className='cardWrapper'>
        <div className='card' id={productIdInfo.id}>
          <div className='CompareButton' onClick={this.handleCompareClick}><i className="far fa-star"></i></div>
          <div className='pic'>
            <img src={featuredURL} alt={productIdInfo.name}></img>
          </div>
          <div className='info'>
            <p className='category'>{productIdInfo.category}</p>
            <h3 className='title'>{productIdInfo.name}</h3>
            <p className='price'>${productIdInfo.default_price}</p>
            {salePrice ? <p className='price sale'>{salePrice}</p> : null}
            <div className='reviewLink'>
              <i className='fas fa-star'></i>
              <i className='fas fa-star-half-alt'></i>
              <i className='far fa-star'></i>
            </div>
          </div>
        </div>
        {openCompareModal && (
          <div>
            <ComparisonModal
              closeModal={this.handleCompareClick}
              parentProduct={parentProductIdInfo.name}
              compareProduct={productIdInfo.name}
              compareFeatures={compareFeatures}
            />
          </div>
        )}
      </div>

    );
  }
}

export default RelatedProductCard;