import React from 'react';
import Outfit from './YourOutfitCard.jsx';
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
      outfitRenderList: [],
      addOutfit: ''
    };

    this.addOutfit = this.addOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.refeshOutfit = this.refeshOutfit.bind(this);
    this.renderOutfit = this.renderOutfit.bind(this);
  }

  componentDidMount() {
    this.refeshOutfit();
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

  renderOutfit(productStyles, productInfo) {
    const { outfitRenderList } = this.state;
    let temp = [...outfitRenderList, <div className='cardWrapper'>
      <div className='pic'>
        <img src='https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'></img>
      </div>
      <div className='info'>
        <p className='category'>{productInfo.category}</p>
        <h3 className='title'>{productInfo.name}</h3>
        <p className='price'>${productInfo.default_price}</p>
      </div>
    </div>
    ];
    this.setState({
      outfitRenderList: temp
    });
  }


  addOutfit() {
    const { productId } = this.props;

    axios.post('/outfit', { productId: productId })
      // .then(({ data }) => {
      //  // this.refeshOutfit();
      // })
      .then(({ data }) => {
        let productId = data.productId;
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
            let newoutfitRenderList = this.renderOutfit(this.state.productStyles, this.state.productInfo, this.outfitRenderList);
            console.log(this.state.outfitRenderList);
          })
          .catch((err) => {
            console.log('Error getting product style in YourOutfit', err);
          });
      })
      .catch((err) => {
        console.log('Error getting product style in YourOutfit', err);
      });
  }


  deleteOutfit() {
    const { productId } = this.props;
    const { outfits } = this.state;

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
    const { outfits } = this.state;
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
            {this.state.outfitRenderList}
          </div>
        </div>
      </div>
    );
  }
}

export default YourOutfitList;