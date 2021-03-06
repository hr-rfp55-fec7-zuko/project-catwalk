import React from 'react';
import styled from 'styled-components';

import axios from 'axios';
import AvgRatingStars from '../RatingsAndReviews/helpers/AvgRatingStars.jsx';

class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIdInfo: '',
      productStyle: '',
      salePrice: '',
      featuredURL: '',
      avgRating: '',
    };

    this.changeProductOutfit = this.changeProductOutfit.bind(this);
    this.hanldeDelete = this.hanldeDelete.bind(this);
  }

  componentDidMount() {
    const { outfit } = this.props;
    let url;
    let shortInfo = outfit.data.info;
    let shortStyles = outfit.data.styles;
    const defaultProduct = shortStyles.find((product) => product['default?'] === true);

    if (!defaultProduct) {
      let shortPath = outfit.data.info;
      url = shortStyles[0].photos[0].thumbnail_url;
      this.setState({
        salePrice: shortStyles[0].sale_price,
      });
    } else {
      url = defaultProduct.photos[0].thumbnail_url;
      this.setState({
        salePrice: defaultProduct.sale_price,
      });
    }
    if (!url) {
      this.setState({
        productIdInfo: shortInfo,
        productStyles: shortStyles,
        avgRating: outfit.data.avgRating,
        featuredURL: '/images/default-placeholder.png',
      });
    } else {
      this.setState({
        productIdInfo: shortInfo,
        productStyles: shortStyles,
        avgRating: outfit.data.avgRating,
        featuredURL: url,
      });
    }
  }

  changeProductOutfit(event) {
    event.preventDefault();
    this.props.updateProductID(this.state.productIdInfo.id);
  }

  hanldeDelete(event) {
    event.preventDefault();
    this.props.deleteOutfit(this.state.productIdInfo.id);
  }

  render() {
    const { productIdInfo, featuredURL, salePrice, avgRating } = this.state;
    const sale = { textDecoration: salePrice ? 'line-through' : 'none' };

    return (
      <div className="cardWrapper" id={productIdInfo.id}>
        <div className='card' >
          <div className='CompareButton' onClick={this.hanldeDelete} ><i className="fa fa-times" aria-hidden="true"></i></div>
          <div className='containerCard' onClick={this.changeProductOutfit}>
            <div className='pic'>
              <img src={featuredURL} alt={productIdInfo.name}></img>
            </div>
            <div className='info'>
              <p className='category'>{productIdInfo.category}</p>
              <h3 className='title'>{productIdInfo.name}</h3>
              <p><span style={sale}>${productIdInfo.default_price}</span>{salePrice ? <span className='salePrice'> ${salePrice}</span> : null}</p>
              <AvgRatingStars avgRating={avgRating} />
            </div></div>
        </div>
      </div>

    );
  }
}

export default YourOutfitCard;