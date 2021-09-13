import React from 'react';
import SortBar from './SortBar.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import AddReviewForm from './AddReviewForm.jsx';

class RatingsAndReviews extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ratings-and-reviews">
        <h2>Ratings and Reviews</h2>
        <SortBar />
        <ReviewList />
        <RatingBreakdown />
        <ProductBreakdown />
        <AddReviewForm />
      </div>
    );
  }
}


export default RatingsAndReviews;