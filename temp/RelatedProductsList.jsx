import React from 'react';
import ReactDom from 'react-dom';
import ItemEntry from './ItemEntry.jsx';
import Carousel from 'react-simply-carousel';

class relatedProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeSlideIndex: 0,
    };
    // this.setActiveSlideIndex = this.setActiveSlideIndex.bind(this);

  }

  // setActiveSlideIndex(newActiveSlideIndex) {
  //   this.setState({
  //     activeSlideIndex: newActiveSlideIndex,
  //   });
  // }

  render() {
    return (
      <div className='RelatedProductsList'> {
        this.props.relatedProductsList.map((item, index) => (
          <ItemEntry
            item={item}
            key={index}
          />
        ))
      }
      </div>
    );
  }
}

export default RelatedProductsList;