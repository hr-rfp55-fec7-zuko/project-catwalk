import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';

const axios = require('axios');

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productStyles: '',
      productInfo: '',
      outfits: [],
    };

    this.addOutfit = this.addOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
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

      axios.get(`/outfit`)
        .then(({ data }) => {
          this.setState({
            outfits: data
          });
        })
        .catch((err) => {
          console.log('Error getting product style in YourOutfit', err);
        });
    }
  }

  addOutfit() {
    const { productId } = this.props;
    const { outfits } = this.state;






    axios.post('/outfit', { productId: productId })
      .then(() => {


      });


    // .then(({ data }) => {
    //   let newOutfit = productId[productId];
    //   outfits.push(newOutfit);
    //   this.setState({
    //     outfits: outfits
    //   });
    //   console.log(outfits);
    // })
    // .catch((err) => {
    //   console.log('Error getting product style in YourOutfit', err);
    // });
    // .then(({ data }) => {
    //   let idx;
    //   let IdNewOutfit = productId[productId];
    //   // outfits.forEach((outfitId, i) => {
    //   //   if (outfitId === IdNewOutfit) {
    //   //     idx = i;
    //   //   }
    //   // });

    //   // if (idx >= 0) {
    //   //   console.log('This product already added');
    //   // } else {

    //     outfits.push(IdNewOutfit);
    //     this.setState({
    //       outfits: outfits,
    //     });
    //     console.log(outfits);
    //  // }


    //   // })
    //   .catch ((err) => {
    //   console.log('Error getting product style in YourOutfit', err);
    // });

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
        console.log(outfits);
      })
      .catch((err) => {
        console.log('Error getting product style in YourOutfit', err);
      });
  }


  render() {
    const { outfits } = this.state;
    console.log(outfits);
    return (
      <div>
        <h2>Your outfit</h2>
        <div className="YourOutfit">
          <div className="cardWrapper" onClick={this.addOutfit} >
            <div className='AddOutfitContent card '><span>+ Add To Your Outfit</span>
            </div>
          </div>
          <div className="cardWrapper" onClick={this.deleteOutfit} >
            <div className='AddOutfitContent card '><span>+ Delete To Your Outfit</span>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    );
  }
}

export default YourOutfitList;