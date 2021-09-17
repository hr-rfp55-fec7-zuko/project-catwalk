import React from 'react';
import Outfit from './Outfit.jsx';
import RelatedProductCard from '../RelatedProducts/RelatedProductCard.jsx';
import YourOutfitCard from './YourOutfitCard.jsx';


const axios = require('axios');

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productStyles: '',
      productInfo: '',
      outfits: [],
      outfitRenderList: []
    };

    this.addOutfit = this.addOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.refeshOutfit = this.refeshOutfit.bind(this);
  }

  refeshOutfit() {
    axios.get('/outfit')
      .then(({ data }) => {
        this.setState({
          outfits: data
        });
      })
      .catch((err) => {
        console.log('Error getting product style in YourOutfit', err);
      });
  }

  componentDidMount() {
    const { productId } = this.props;
    if (productId !== undefined) {
      axios.get(`/products/${productId}`)
        .then(({ data }) => {
          this.setState({
            productInfo: data,
          });
        })
        .catch((err) => {
          console.log('Error getting product detail in YourOutfit', err);
        });

      axios.get(`/products/${productId}/styles`)
        .then(({ data }) => {
          this.setState({
            productStyles: data
          });
        })
        .catch((err) => {
          console.log('Error getting product style in YourOutfit', err);
        });

      this.refeshOutfit();
    }
  }

  addOutfit() {
    const { productId, productInfo } = this.props;
    const { outfits, outfitRenderList } = this.state;

    axios.post('/outfit', { productId: productId })
      .then(({ data }) => {
        this.refeshOutfit();
      })
      .catch((err) => {
        console.log('Error getting product style in YourOutfit', err);
      });
  }


  deleteOutfit() {
    const { productId } = this.props;
    const { outfits, outfitRenderList } = this.state;

    axios.delete(`/outfit/${productId}`)
      .then(({ data }) => {
        outfits.pop(productId);
        this.setState({
          outfits: outfits
        });
      })
      .catch((err) => {
        console.log('Error getting product style in YourOutfit', err);
      });
  }



  render() {
    const { outfits, outfitRenderList } = this.state;
    console.log(outfits);
    return (
      <div>
        <h2>Your outfit</h2>
        <div className="YourOutfit">
          <div className="cardWrapper" onClick={this.addOutfit}>
            <div className='AddOutfitContent card '><span>+ Add To Your Outfit</span>
            </div>
          </div>
          <div className="cardWrapper" onClick={this.deleteOutfit} >
            <div className='AddOutfitContent card '><span>+ Delete To Your Outfit</span>
            </div>
          </div>
          <div>

            {outfits.map((product, i) => {
              <Outfit />
              // console.log('test:', product)
            //   <RelatedProductCard
            //   parentProductId={productId}
            //   productId={product.productId}
            //   parentProductIdInfo={parentProductIdInfo}
            //   key={product}
            // />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default YourOutfitList;