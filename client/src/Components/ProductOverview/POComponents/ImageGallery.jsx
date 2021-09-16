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
    if (this.state.photos[this.props.selectedStyle]) {
      return (
        <div id='po-image-gallery' >
          <div className='image-thumbnails' >

          </div>
          <div className='image-carousel'>
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