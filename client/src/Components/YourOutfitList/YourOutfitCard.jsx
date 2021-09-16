import React from 'react';
import ReactDom from 'react-dom';

import axios from 'axios';

class YourOutfitCard extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      productIDInfo: '',
      salePrice: '',
      featuredURL: '',
    };
  }

  render() {
    return (
      <div className='cardWrapper'>
        <div className='card'>
        <div className='DeleteButton'><i className="fas fa-times"></i></div>
          <div className='pic'>
            <img src='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-260w,f_auto,q_auto:best/newscms/2021_37/1773325/51yian5l46l-sl500--613f6a78de078.jpg' />
          </div>
          <div className='info'>
            <p className='category'>Pants</p>
            <h3 className='title'>Morning Joggers</h3>
            <p className='price'> $20</p>
            <div className='reviewLink'>*****</div>
          </div>
        </div>
      </div>

    );
  }
}

export default YourOutfitCard;