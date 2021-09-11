import React from 'react';
import ReactDom from 'react-dom';
import ItemEntry from './ItemEntry.jsx';
import Carousel from 'react-simply-carousel';

class RelatedItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlideIndex: 0,
    };
    this.setActiveSlideIndex = this.setActiveSlideIndex.bind(this);

  }

  setActiveSlideIndex(newActiveSlideIndex) {
    this.setState({
      activeSlideIndex: newActiveSlideIndex,
    });
  }



  render() {
    return (
      <div className='relatedItemsList'>
        <Carousel
          activeSlideIndex={this.state.activeSlideIndex}
          onRequestChange={this.setActiveSlideIndex}
          itemsToShow={4}
          itemsToScroll={3}
        >
          <ItemEntry />
        </Carousel>
      </div>
    );
  }
}

export default RelatedItemsList;