import React from 'react';
import RelatedProductCard from './RelatedProductCard.jsx';

const axios = require('axios');

class RelatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: this.props.relatedProducts,
      parentProductIdInfo: '',
      imagesToTheLeft: false,
      imagesToTheRight: false,
      cardOverflow: false,
    };

    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.isOverflowing = this.isOverflowing.bind(this);
  }


  componentDidMount() {
    const { productId } = this.props;
    axios.get(`/products/${productId}`)
      .then(({ data }) => {
        this.setState({
          parentProductIdInfo: data,
        });
      })
      .catch(err => {
        console.log('Error getting the product detail', err);
      });
  }


  scrollLeft() {
    this.setState({
      imagesToTheRight: true,
    });
    const carousel = document.getElementById('ProductCarousel');
    carousel.scrollLeft -= 307;

    if (carousel.scrollLeft <= 307) {

      this.setState({
        imagesToTheLeft: false,
      });
    }
  }

  scrollRight() {
    this.setState({
      imagesToTheLeft: true,
    });
    const carousel = document.getElementById('ProductCarousel');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;

    carousel.scrollLeft += 307;
    if (carousel.scrollLeft >= amountLeftToScroll - 400) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  isOverflowing() {
    const carousel = document.getElementById('ProductCarousel');
    const bool = carousel.scrollWidth > carousel.clientWidth;
    this.setState({
      cardOverflow: bool,
      imagesToTheRight: bool,
    });
  }

  render() {
    const { parentProductIdInfo, imagesToTheRight, imagesToTheLeft } = this.state;
    const { relatedProducts, productId } = this.props;
    if (parentProductIdInfo.length === 0) {
      return (
        null
      );
    }

    return (
      <div className='ListWrapper'>
        {imagesToTheRight ? (<div className='RightButtonWrapper'>
          <div className='RightButton' onClick={this.scrollRight}><i className="fas fa-chevron-circle-right"></i></div></div>) : null}

        <div id='ProductCarousel' className='RelatedProductsList' onLoad={this.isOverflowing}>
          {relatedProducts.map((product) => (
            <RelatedProductCard
              parentProductId={productId}
              productId={product}
              parentProductIdInfo={parentProductIdInfo}
              key={product}
              updateProductID={this.props.updateProductID}
            />
          ))}
        </div>

        {imagesToTheLeft ? (<div className='LeftButtonWrapper'><div className='LeftButton' onClick={this.scrollLeft}><i className="fas fa-chevron-circle-left"></i></div></div>) : null}
      </div>
    );

  }
}

export default RelatedProductsList;