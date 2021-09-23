import React from 'react';
import YourOutfitCard from './YourOutfitCard.jsx';
const axios = require('axios');

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: [],
      productIdInfo: '',
      productStyle: '',
      imagesToTheLeft: false,
      imagesToTheRight: false,
      cardOverflow: false,
    };

    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.isOverflowing = this.isOverflowing.bind(this);
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
    const { productId, avgRating } = this.props;
    const { productStyle, productIdInfo, outfits } = this.state;
    let index;

    outfits.forEach((item, i) => {
      if (item.data.info.id === parseInt(productId)) {
        index = i;
      }
    });
    if (index >= 0) {
      alert('Outfit already added!');
    } else {
      const newOutfitArr = [{
        info: productIdInfo,
        styles: productStyle,
        avgRating: avgRating
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

  deleteOutfit(productNeedToDelete) {
    this.setState({ outfits: [] }, () => {
      axios.delete(`/outfit/${productNeedToDelete}`)
        .then(({ data }) => {
          if (data.length > 0) {
            this.setState({
              outfits: data
            });
          }
        })
        .catch((error) => {
          conaole.log('Error deleting an Outfit', error);
        });
    });
  }
  scrollLeft() {
    this.setState({
      imagesToTheRight: true,
    });
    const carousel = document.getElementById('outfitCarousel');
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
    const carousel = document.getElementById('outfitCarousel');
    const amountLeftToScroll = carousel.scrollWidth - carousel.clientWidth;

    carousel.scrollLeft += 307;
    if (carousel.scrollLeft >= amountLeftToScroll - 400) {
      this.setState({
        imagesToTheRight: false,
      });
    }
  }

  isOverflowing() {
    const carousel = document.getElementById('outfitCarousel');
    const bool = carousel.scrollWidth - 200 > carousel.clientWidth;
    this.setState({
      cardOverflow: bool,
      imagesToTheRight: bool,
    });
  }

  render() {
    const { imagesToTheRight, imagesToTheLeft, avgRating } = this.state;
    return (
      <React.Fragment>
        <h2>Your outfit</h2>
        <div className='outfitContainer'>
          <div className="cardWrapper" onClick={this.addOutfit} id="addOutfit">
            <div className='AddOutfitContent card '><span>+ Add To Your Outfit</span></div>
          </div>
          <div className='ListWrapper outfitWrapper'>
            {imagesToTheRight ? (<div className='RightButtonWrapper'>
              <div className='RightButton' onClick={this.scrollRight}><i className="fas fa-chevron-circle-right"></i></div></div>) : null}

            <div id='outfitCarousel' className='YourOutfit' onLoad={this.isOverflowing}>
              {this.state.outfits.map((outfit, i) => (
                <YourOutfitCard
                  outfit={outfit}
                  key={i}
                  deleteOutfit={this.deleteOutfit}
                  avgRating={avgRating}
                  updateProductID={this.props.updateProductID}
                />
              ))}
            </div>

            {imagesToTheLeft ? (<div className='LeftButtonWrapper'><div className='LeftButton' onClick={this.scrollLeft}><i className="fas fa-chevron-circle-left"></i></div></div>) : null}
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default YourOutfitList;
