import React from 'react';

class YourOutfitCard extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      productIdInfo: '',
      featuredURL: '',
      productIdStyles: '',
      salePrice: '',
      avgRating: '',
    };
  }

  componentDidMount() {
    const { outfit } = this.props;
    const defaultProduct = outfit.styles.find(product => product['default?'] === true);
    let url;
    if (!defaultProduct) {
      url = outfit.styles[0].photos[0].thumbnail_url;
      this.setState({
        salePrice: outfit.styles[0].sale_price,
      });
    } else {
      url = defaultProduct.photos[0].thumbnail_url;
      this.setState({
        salePrice: defaultProduct.sale_price,
      });
    }

    if (!url) {
      this.setState({
        productIdInfo: outfit.info,
        productIdStyles: outfit.style,
        featuredURL: '/images/default-placeholder.png',
      });
    } else {
      this.setState({
        productIdInfo: outfit.info,
        productIdStyles: outfit.style,
        featuredURL: url,
      });
    }
  }

  render() {
    const { salePrice, featuredURL, productIdInfo } = this.state;

    return (
      <div className='cardWrapper'>
        <div className='pic'>
          <img src={featuredURL} alt={productIdInfo.name}></img>
        </div>
        <div className='info'>
          <p className='category'>{productIdInfo.category}</p>
          <h3 className='title'>{productIdInfo.name}</h3>
          <p className='price'>${productIdInfo.default_price}</p>
          {salePrice ? <p className='price sale'>{salePrice}</p> : null}
          <AvgRatingStars avgRating={avgRating} id={productIdInfo.id} />
        </div>
      </div>

    );
  }
}

export default YourOutfitCard;