import React from 'react';
import ImageGallery from './POComponents/ImageGallery.jsx';
import StarRating from './POComponents/StarRating.jsx';
import StyleSelector from './POComponents/StyleSelector.jsx';
import AddToCart from './POComponents/AddToCart.jsx';
import SocialMediaButtons from './POComponents/SocialMediaButtons.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='po-main'>
        <ImageGallery />
        <StarRating />
        <button>Read all Reviews</button>
        Category Stand in
        Product Name Stand in
        Product Price
        <StyleSelector />
        <AddToCart />
        Product description
        <SocialMediaButtons />
      </div>
    );
  }
}

export default ProductOverview;