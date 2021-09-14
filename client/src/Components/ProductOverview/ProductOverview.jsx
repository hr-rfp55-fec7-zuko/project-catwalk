import React from 'react';
import ky from 'ky';
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
        <p>Category Stand in</p>
        <p>Product Name Stand in</p>
        <p>Product Price</p>
        <StyleSelector />
        <AddToCart />
        Product description
        <SocialMediaButtons />
      </div>
    );
  }

  componentDidMount() {
    ky.get('http://localhost:3000/products/40344').json()
      .then((response) => console.log(response));
  }
}

export default ProductOverview;