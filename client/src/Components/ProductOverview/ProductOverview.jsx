import React from 'react';
import axios from 'axios';
import ImageGallery from './POComponents/ImageGallery.jsx';
import StarRating from './POComponents/StarRating.jsx';
import StyleSelector from './POComponents/StyleSelector.jsx';
import AddToCart from './POComponents/AddToCart.jsx';
import SocialMediaButtons from './POComponents/SocialMediaButtons.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.productId,
      features: []
    };
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getStyleInfo = this.getStyleInfo.bind(this);
  }

  getProductInfo(id) {
    axios.get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        var data = response.data;
        this.setState({
          name: data.name,
          slogan: data.slogan,
          description: data.description,
          category: data.category,
          price: data.default_price,
          features: data.features
        });
      });
  }

  getStyleInfo(id) {
    axios.get(`http://localhost:3000/products/${id}/styles`)
      .then((response) => {
        this.setState({
          styles: response.data
        });
      });
  }

  render() {
    return (
      <div className='po-main'>
        <ImageGallery />
        <StarRating />
        <button>Read all Reviews</button>
        <p>{this.state.category}</p>
        <p>{this.state.name}</p>
        <p>{this.state.price}</p>
        <StyleSelector />
        <AddToCart />
        <p>{this.state.slogan}</p>
        <p>{this.state.description}</p>
        <ul>Features
          {this.state.features.map((feat) => <li key={feat.feature} >{feat.feature}: {feat.value}</li>)}
        </ul>
        <SocialMediaButtons />
      </div>
    );
  }

  componentDidMount() {
    this.getProductInfo(this.state.id);
    this.getStyleInfo(this.state.id);
  }
}

export default ProductOverview;