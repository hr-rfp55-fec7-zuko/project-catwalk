import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.styles !== prevProps.styles) {
      var photos = {};
      for (var i = 0; i < this.props.styles.length; i++) {
        var styleID = this.props.styles[i].style_id;
        var thumbArr = [];
        var photoArr = [];
        this.props.styles[i].photos.forEach((set) => {
          thumbArr.push(set.thumbnail_url);
          photoArr.push(set.url);
        });
        photos[`${styleID}_thumb`] = thumbArr;
        photos[`${styleID}_full`] = photoArr;
      }
      this.setState({ photos });
    }
  }

  render() {
    var thumbPhotos = this.state.photos[`${this.props.selectedStyle}_thumb`];
    var fullPhotos = this.state.photos[`${this.props.selectedStyle}_full`];
    if (this.state.photos[`${this.props.selectedStyle}_full`]) {
      return (
        <div id='po-image-gallery' >
          <div className='image-thumbnails' >

          </div>
          <div className='carousel'>
            <button className='carousel__button carousel__button--left'>
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className='carousel__track-container' >
              <ul className='carousel__track'>
                {fullPhotos.map((image) => <li className='carousel__slide'><img className='carousel__image' src={image} /></li>)}
              </ul>
            </div>
            <button className='carousel__button carousel__button--right'>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div id='po-image-gallery' >
        Image Gallery Stand In
      </div>
    );
  }
}

export default ImageGallery;