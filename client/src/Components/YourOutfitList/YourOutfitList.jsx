import React from 'react';
import ReactDom from 'react-dom';
import YourOutfitCard from './YourOutfitCard.jsx';

const axios = require('axios');

class YourOutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentProductIDInfo: '',
    };
  }

  render() {
    return (
      <div>
        <h2>Your outfit</h2>
        <div className="YourOutfit">
          <div className='AddOutfitContent card'><span>+ Add To Your Outfit</span></div>
          <YourOutfitCard />
        </div>
      </div>
    );
  }
}

export default YourOutfitList;