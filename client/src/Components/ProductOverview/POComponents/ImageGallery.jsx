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
        var photoArr = [];
        this.props.styles[i].photos.forEach((set) => {
          photoArr.push(set.thumbnail_url);
          photoArr.push(set.url);
        });
        photos[styleID] = photoArr;
      }
      this.setState({photos});
    }
  }

  render() {
    return (
      <div id='po-image-gallery' >
        Image Gallery Stand In
      </div>
    );
  }
}

export default ImageGallery;