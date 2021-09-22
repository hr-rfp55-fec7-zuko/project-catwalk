import React from 'react';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: {},
      current: 0,
      expanded: false,
      zoomed: false,
      thumbnailMax: null,
      down: 0,
      imageX: 0,
      imageY: 0
    };
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.expandSlide = this.expandSlide.bind(this);
    this.zoomSlide = this.zoomSlide.bind(this);
    this.setSlideFromThumbnail = this.setSlideFromThumbnail.bind(this);
    this.handleZoomMouseMove = this.handleZoomMouseMove.bind(this);
  }

  nextSlide() {
    var length = this.state.photos[`${this.props.selectedStyle}_full`].length;
    if (this.state.current < length - 1) {
      var current = this.state.current + 1;
      this.setState({ current });
      if (current > this.state.thumbnailMax - 1) {
        document.getElementById('thumbnail__track').scrollTop += 58;
        this.setState({ down: this.state.down + 1 });
      }
    }
  }

  prevSlide() {
    var length = this.state.photos[`${this.props.selectedStyle}_full`].length;
    if (this.state.current > 0) {
      var current = this.state.current - 1;
      this.setState({ current });
      if (current === this.state.down) {
        document.getElementById('thumbnail__track').scrollTop -= 58;
        this.setState({ down: this.state.down - 1 });
      }
    }
  }

  expandSlide() {
    if (this.state.expanded && this.state.zoomed) {
      this.setState({ zoomed: false });
    }
    this.setState({
      expanded: !this.state.expanded
    });
    this.props.expandSlide();
  }

  zoomSlide() {
    this.setState({
      zoomed: !this.state.zoomed
    });
  }

  setSlideFromThumbnail(index) {
    this.setState({
      current: index
    });
  }

  handleZoomMouseMove(event) {
    event.preventDefault();
    var photo = document.getElementById('carousel__track');
    var rect = photo.getBoundingClientRect();
    var imageX = Math.abs(event.clientX - rect.x) / rect.width * 100;
    var imageY = Math.abs(event.clientY - rect.y) / rect.height * 100;
    this.setState({ imageX, imageY });
  }

  componentDidUpdate(prevProps) {
    if (this.props.styles !== prevProps.styles) {
      var photos = {};
      var thumbnailMax = 7;
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
        if (thumbArr.length < thumbnailMax) {
          thumbnailMax = thumbArr.length;
        }
      }
      this.setState({ photos, thumbnailMax });
    }
  }

  render() {
    var thumbPhotos = this.state.photos[`${this.props.selectedStyle}_thumb`] || [];
    var fullPhotos = this.state.photos[`${this.props.selectedStyle}_full`] || [];
    var length = fullPhotos.length;
    return (
      <div className='po-image-gallery' >
        {this.state.expanded ?
          <div className='thumbnail-navtrack'>
            {thumbPhotos.map((image, index) => {
              return (
                <i
                  key={index}
                  className={index === this.state.current ? 'thumbnail__nav thumbnail__nav-current fas fa-circle' : 'thumbnail__nav fas fa-circle'}
                  onClick={() => this.setSlideFromThumbnail(index)}
                ></i>
              );
            })}
          </div>
          : <div className='thumbnail-container' >
            {(this.state.current !== 0 && !this.state.zoomed) &&
              (<button
                className='thumbnail__button thumbnail__button--up'
                onClick={this.prevSlide} >
                <i className="fas fa-chevron-up fa-lg"></i>
              </button>
              )}
            <div
              className='thumbnail__track' id='thumbnail__track'
              style={{ height: `${this.state.thumbnailMax * 58}px` }}>
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
              onClick={this.nextSlide}
              style={{ top: `${this.state.thumbnailMax * 58 + 34}px` }} >
              <i className="fas fa-chevron-down fa-lg"></i>
            </button>)}
          </div>}
        <div className='carousel'>
          {(this.state.current !== 0 && !this.state.zoomed) &&
            (<button
              className='carousel__button carousel__button--left'
              onClick={this.prevSlide}
              style={this.state.expanded ? { left: '20px' } : { left: '80px' }} >
              <i className="fas fa-arrow-left fa-lg"></i>
            </button>
            )}
          <div className='carousel__track' id='carousel__track' >
            {length === 0 ?
              <img
                id={this.state.zoomed ? 'zoomed-slide' : 'carousel__slide'}
                className={this.state.expanded ? 'carousel__slide expanded-slide' : 'carousel__slide'}
                src={'/images/default-placeholder.png'}
                onClick={!this.state.expanded ? this.expandSlide : this.zoomSlide}
                onMouseMove={this.state.zoomed ? this.handleZoomMouseMove : null}
                style={{
                  objectPosition: `${this.state.imageX}% ${this.state.imageY}%`,
                  transformOrigin: `${this.state.imageX}% ${this.state.imageY}%`
                }} />
              : fullPhotos.map((image, index) => {
                if (index === this.state.current) {
                  return (
                    <img
                      key={index}
                      id={this.state.zoomed ? 'zoomed-slide' : 'carousel__slide'}
                      className={this.state.expanded ? 'carousel__slide expanded-slide' : 'carousel__slide'}
                      src={image}
                      onClick={!this.state.expanded ? this.expandSlide : this.zoomSlide}
                      onMouseMove={this.state.zoomed ? this.handleZoomMouseMove : null}
                      style={{
                        objectPosition: `${this.state.imageX}% ${this.state.imageY}%`,
                        transformOrigin: `${this.state.imageX}% ${this.state.imageY}%`
                      }} />
                  );
                }
              })

            }
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
}

export default ImageGallery;
