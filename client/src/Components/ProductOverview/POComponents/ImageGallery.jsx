import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: {},
      current: 0,
      expanded: false,
      zoomed: false
    };
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.expandSlide = this.expandSlide.bind(this);
    this.zoomSlide = this.zoomSlide.bind(this);
    this.setSlideFromThumbnail = this.setSlideFromThumbnail.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  nextSlide() {
    var length = this.state.photos[`${this.props.selectedStyle}_full`].length;
    if (this.state.current < length - 1) {
      this.setState({ current: this.state.current + 1 });
    }
  }

  prevSlide() {
    var length = this.state.photos[`${this.props.selectedStyle}_full`].length;
    if (this.state.current > 0) {
      this.setState({ current: this.state.current - 1 });
    }
  }

  expandSlide() {
    if (this.state.expanded && this.state.zoomed) {
      this.setState({ zoomed: false });
    }
    console.log('you want to expand the image');
    this.setState({
      expanded: !this.state.expanded
    });
    this.props.expandSlide();
  }

  zoomSlide() {
    //console.log('you want to zoom');
    this.setState({
      zoomed: !this.state.zoomed
    });
  }

  setSlideFromThumbnail(index) {
    this.setState({
      current: index
    });
  }

  scrollUp() {
    document.getElementById('thumbnail__track').scrollTop -= 58;
  }

  scrollDown() {
    document.getElementById('thumbnail__track').scrollTop += 58;
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
      var length = fullPhotos.length;
      return (
        <div className='po-image-gallery' >
          <div className='thumbnail-container' >
            {(this.state.current !== 0 && !this.state.zoomed) &&
              (<button
                className='thumbnail__button thumbnail__button--up'
                onClick={() => {
                  this.prevSlide();
                  this.scrollUp();
                }} >
                <i className="fas fa-chevron-up fa-lg"></i>
              </button>
              )}
            {/* thumbnail-track*/}
            {/* each thumbnail-slide */}
            <div className='thumbnail__track' id='thumbnail__track' >
              {thumbPhotos.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    className={index === this.state.current ? 'thumbnail__slide thumbnail__slide-current' : 'thumbnail__slide'}
                    onClick={() => this.setSlideFromThumbnail(index)} />
                );
              })}
            </div>
            {(this.state.current !== length - 1 && !this.state.zoomed) && (<button
              className='thumbnail__button thumbnail__button--down'
              onClick={() => {
                this.nextSlide();
                this.scrollDown();
              }} >
              <i className="fas fa-chevron-down fa-lg"></i>
            </button>)}
          </div>
          <div className='carousel'>
            {(this.state.current !== 0 && !this.state.zoomed) &&
              (<button
                className='carousel__button carousel__button--left'
                onClick={this.prevSlide} >
                <i className="fas fa-arrow-left fa-lg"></i>
              </button>
              )}
            <div className='carousel__track-container' >
              <ul className='carousel__track'>
                {fullPhotos.map((image, index) => {
                  return (
                    <li
                      key={index}
                      className={this.state.expanded ? 'carousel__slide expanded-slide' : 'carousel__slide'}
                      onClick={!this.state.expanded ? this.expandSlide : this.zoomSlide}
                      style={this.state.zoomed ? { cursor: 'zoom-out' } : null}>
                      {index === this.state.current &&
                        (<img
                          className='carousel__image'
                          src={image} />)}
                    </li>
                  );
                })}
              </ul>
            </div>
            {!this.state.zoomed &&
              <button
                className='carousel__button carousel__button--expand'
                onClick={this.expandSlide} >
                <i className="fas fa-expand fa-lg"></i>
              </button>}
            {(this.state.current !== length - 1 && !this.state.zoomed) &&
              (<button
                className='carousel__button carousel__button--right'
                onClick={this.nextSlide} >
                <i className="fas fa-arrow-right fa-lg"></i>
              </button>)}
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
