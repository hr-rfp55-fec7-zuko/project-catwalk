import React from 'react';
import axios from 'axios';

class RelatedProductCard extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      productIDInfo: '',
      featuredURL: '',
      salePrice: '',
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    const { productIDInfo } = this.state;
    axios.get(`products/${productId}`)
      .then(({ data }) => {
        this.setState({
          productIDInfo: data,
        });
      });
  }

  render() {
    const { productIDInfo, featuredURL, salePrice } = this.state;
    const { relatedProducts, productID } = this.props;
    return (
      <div className='card'>
        <div className='pic'>
          <img src='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-260w,f_auto,q_auto:best/newscms/2021_37/1773325/51yian5l46l-sl500--613f6a78de078.jpg' />
        </div>
        <div className='info'>
          <p className='category'>{productIDInfo.category}</p>
          <h3 className='title'>{productIDInfo.name}</h3>
          <p className='price'>{productIDInfo.default_price}</p>
          <div className='reviewLink'>*****</div>
        </div>
      </div>
    );
  }
}

export default RelatedProductCard;