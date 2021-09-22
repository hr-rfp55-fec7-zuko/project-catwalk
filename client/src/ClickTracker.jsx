import React from 'react';
import axios from 'axios';


const withClickTracked = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.clickTrack = this.clickTrack.bind(this);
    }

    clickTrack(selector, section, date) {
      axios.post('/interactions', {params: {element: selector, widget: section, time: date}})
        .then(response => console.log('Success', response))
        .catch(err => console.log('Click Tracker', err));
    }

    render() {
      return (
        <WrappedComponent clickTrack={this.clickTrack} {...this.props}/>
      );
    }
  };
};

export default withClickTracked;