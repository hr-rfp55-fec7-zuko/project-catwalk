import React from 'react';
import helpers from './helpers/helpers.js';
import AvgRatingStars from './helpers/AvgRatingStars.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let metaData = this.props.metaData;
    let reviewCount = this.props.reviewCount;

    let avgRating = helpers.determineAverageRating(metaData.ratings, reviewCount);

    let percentageRecommended = helpers.determinePercentageRecommend(metaData.recommended);

    const ratingBars = [];

    for (var rating in metaData.ratings) {
      ratingBars.push (
        <div className='rating-breakdown'>
          <div className='rating-bar-outer'>
            Bar Here<div className='rating-bar-inner'>
            </div>
          </div>
          {metaData.ratings[rating]}
        </div>
      );
    }

    //NOTE: for star icon: <i class="far fa-star"></i>
    return (
      <div className="rating-breakdown">
        <h3>Ratings and Reviews</h3>

        {/* <div>{averageRating}</div> */}
        <AvgRatingStars avgRating={avgRating}/>

        <div> {percentageRecommended}% of reviews recommend this product</div>

        <div className="star-review-outer">
          star star star star star
          <div className="star-review-inner">
          </div>
        </div>

        {ratingBars}

      </div>

    );
  }
}

export default RatingBreakdown;
