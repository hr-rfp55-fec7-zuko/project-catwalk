import React from 'react';
import ReactDom from 'react-dom';

class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='card'>
        <div className='pic'>
          <img src="https://m.media-amazon.com/images/I/41sxUiYQxFL._AC_SR160,200_.jpg" />
        </div>
        <div className='info'>
          <p className='category'>Jackets</p>
          <h3 className='title'><a href='#'>Camo Onesie</a></h3>
          <p className='price'>$140</p>
          <div className='eviewLink'>*****</div>
        </div>
      </div>
    );
  }
}

export default ItemEntry;