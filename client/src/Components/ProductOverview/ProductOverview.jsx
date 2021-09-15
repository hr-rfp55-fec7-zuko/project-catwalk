import React from 'react';
import axios from 'axios';
import ImageGallery from './POComponents/ImageGallery.jsx';
import StarRating from './POComponents/StarRating.jsx';
import StyleSelector from './POComponents/StyleSelector.jsx';
import AddToCart from './POComponents/AddToCart.jsx';
import SocialMediaButtons from './POComponents/SocialMediaButtons.jsx';
import Price from './POComponents/Price.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.productId,
      features: [],
      styles: []
    };
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getStyleInfo = this.getStyleInfo.bind(this);
    this.setStyleSelection = this.setStyleSelection.bind(this);
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

  setStyleSelection(style) {
    this.setState({ style });
    if (style.sale_price) {
      this.setState({
        sale: true,
        salePrice: style.sale_price
      });
    } else {
      this.setState({
        sale: false,
        salePrice: style.sale_price
      });
    }
  }

  render() {
    return (
      <div className='po-main'>
        <ImageGallery />
        <div className='po-reviews'>
          <StarRating />
          <button className='btn all-reviews'>Read all reviews</button>
        </div>
        <h3>{this.state.category}</h3>
        <h1>{this.state.name}</h1>
        <Price price={this.state.price} sale={this.state.sale} salePrice={this.state.salePrice} />
        <StyleSelector styles={this.state.styles} setStyleSelection={this.setStyleSelection} />
        <AddToCart />
        <div className='po-desc'>
          <div className='po-desc-text'>
            <p><b>{this.state.slogan}</b></p>
            <p>{this.state.description}</p>
          </div>
          <div className='po-desc-list'>
            <ul><b>Features</b>
              {this.state.features.map((feat) => <li key={feat.feature} >{feat.feature}: {feat.value}</li>)}
            </ul>
          </div>
        </div>
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