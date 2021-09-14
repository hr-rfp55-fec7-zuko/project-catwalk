import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: null
    };
  }

  render() {
    return (
      <div className="reviews-list">
        <h3>Review List Here</h3>
        <ReviewTile />
        <button type="button" id="more-reviews">More Reviews</button>
        <button type="button" id="add-review">Add A Review</button>
      </div>
    );
  }
}

export default ReviewList;