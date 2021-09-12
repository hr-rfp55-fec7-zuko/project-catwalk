import React from 'react';
import ReactDom from 'react-dom';

class ItemEntry extends React.Component {
  constructor({props}) {
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
          <p className='category'>{this.props.item.category}</p>
          <h3 className='title'><a href='#'>{this.props.item.name}</a></h3>
          <p className='price'>{this.props.item.default_price}</p>
          <div className='eviewLink'>*****</div>
        </div>
      </div>
    );
  }
}

export default ItemEntry;