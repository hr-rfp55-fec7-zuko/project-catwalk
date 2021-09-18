import React from 'react';
import axios from 'axios';
import AvgRatingStars from '../RatingsAndReviews/helpers/AvgRatingStars.jsx';

class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    const { parentProductIdInfo } = this.props;
    this.state = {
      productIdInfo: '',
      featuredURL: '',
      salePrice: '',
      avgRating: '',
    };

  }

  componentDidMount() {
    const { productId } = this.props;

    // Get the information for a related product
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
  render() {
    const { productIdInfo, featuredURL, salePrice, urlFeaturePic, avgRating } = this.state;
    const { outfit } = this.props;
    return (
      <div className="cardWrapper">
        <div className='card' id={productIdInfo.id}>
          <div className='CompareButton'><i className="far fa-star"></i></div>
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

      </div>

    );
  }
}

export default YourOutfitCard;



// import React from 'react';



// class YourOutfitCard extends React.Component {
//   constructor({ props }) {
//     super(props);
//     this.state = {
//       productIdInfo: '',
//       featuredURL: '',
//       productIdStyles: '',
//       salePrice: '',
//       avgRating: '',
//     };
//   }

//   componentDidMount() {
//     const { outfit } = this.props;
//     const defaultProduct = outfit.styles.find(product => product['default?'] === true);
//     let url;
//     if (!defaultProduct) {
//       url = outfit.styles[0].photos[0].thumbnail_url;
//       this.setState({
//         salePrice: outfit.styles[0].sale_price,
//       });
//     } else {
//       url = defaultProduct.photos[0].thumbnail_url;
//       this.setState({
//         salePrice: defaultProduct.sale_price,
//       });
//     }

//     if (!url) {
//       this.setState({
//         productIdInfo: outfit.info,
//         productIdStyles: outfit.style,
//         featuredURL: '/images/default-placeholder.png',
//       });
//     } else {
//       this.setState({
//         productIdInfo: outfit.info,
//         productIdStyles: outfit.style,
//         featuredURL: url,
//       });
//     }
//   }

//   render() {
//     const { salePrice, featuredURL, productIdInfo } = this.state;

//     return (
//       <div className='cardWrapper'>
//         <div className='pic'>
//           <img src={featuredURL} alt={productIdInfo.name}></img>
//         </div>
//         <div className='info'>
//           <p className='category'>{productIdInfo.category}</p>
//           <h3 className='title'>{productIdInfo.name}</h3>
//           <p className='price'>${productIdInfo.default_price}</p>
//           {salePrice ? <p className='price sale'>{salePrice}</p> : null}
//           <AvgRatingStars avgRating={avgRating} id={productIdInfo.id} />
//         </div>
//       </div>

//     );
//   }
// }

// export default YourOutfitCard;