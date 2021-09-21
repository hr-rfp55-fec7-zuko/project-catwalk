import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';
const axios = require('axios');

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      productIdInfo: '',
      productStyle: ''
    };

    this.addOutfit = this.addOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.fetchAPIOutfit = this.fetchAPIOutfit.bind(this);
  }

  componentDidMount() {
    this.fetchAPIOutfit();
  }

  componentDidUpdate(prevProps) {
    const { productId } = this.props;
    if (prevProps.productId !== productId) {
      this.fetchAPIOutfit();
    }
  }

  fetchAPIOutfit() {
    const { productId } = this.props;
    axios.get('/outfit')
      .then(({ data }) => {
        this.setState({
          outfits: data,
          // outfitsLoaded: true,
        });
      })
      .catch((error) => {
        console.log('Error getting outfit info in yourOutfit List', error);
      });
    axios.get(`/products/${productId}`)
      .then(({ data }) => {
        this.setState({
          productIdInfo: data,
        });
      })
      .catch((err) => {
        console.log('Error geting products detail in a YourOutfit', err);
      });

    axios.get(`/products/${productId}/styles`)
      .then(({ data }) => {
        this.setState({
          productStyle: data,
        });
      })
      .catch((error) => {
        console.log('Error fetching product styles in relatedProductCard', error);
      });
  }

  addOutfit() {
    const { productId } = this.props;
    const { productStyle, productIdInfo, outfits } = this.state;
    let index;

    outfits.forEach((item, i) => {
      console.log(item);
      if (item.data.info.id === productId) {
        index = i;
      }
    });
    if (index >= 0) {
      alert('Outfit already added!');
    } else {
      const newOutfitArr = [{
        info: productIdInfo,
        styles: productStyle,
      }];

      const newOutfitObj = newOutfitArr[0];
      this.setState({
        outfits: [],
      });

      axios.post('/outfit', { data: newOutfitObj })
        .then(() => {
          axios.get('/outfit')
            .then(({ data }) => {
              this.setState({
                outfits: data,
                // outfitsLoaded: true,
              });
            })
            .catch(error => {
              console.log('Error adding outfit', error);
            });
        })
        .catch(error => {
          console.log('Error adding outfit', error);
        });
    }
  }

  deleteOutfit(productId) {
    this.setState({ outfits: [] }, () => {
      axios.delete(`/outfit/${productId}`)
        .then(({ data }) => {
          console.log(data);
          if (data.length > 0) {
            this.setState({
              oufits: data
            });
          }
        })
        .catch((error) => {
          conaole.log('Error deleting an Outfit', error);
        });
    });
  }

  render() {
    return (
      <div>
        <h2>Your outfit</h2>
        <div className="YourOutfit">
          <div className="cardWrapper" onClick={this.addOutfit} id="addOutfit">
            <div className='AddOutfitContent card '><span>+ Add To Your Outfit</span>
            </div>
          </div>
          {this.state.outfits.map((outfit, i) => (
            <YourOutfitCard
              outfit={outfit}
              key={i}
              deleteOutfit={this.deleteOutfit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default YourOutfitList;
