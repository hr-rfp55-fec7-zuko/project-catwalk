import React from 'react';
import helpers from './helpers/helpers.js';
import AvgRatingStars from './helpers/AvgRatingStars.jsx';
import RatingBar from './helpers/RatingBar.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let metaData = this.props.metaData;
    let reviewCount = this.props.reviewCount;

    // let avgRating = helpers.determineAverageRating(metaData.ratings, reviewCount);
    let avgRating = helpers.determineAverageRating(metaData.ratings);
    let oneDecAvgRating = helpers.truncateAverageRating(avgRating);

    let percentageRecommended = helpers.determinePercentageRecommend(metaData.recommended);

    //If there are no reviews for a certain value, set the frequency to zero.
    for (var i = 1; i <= 5; i++ ) {
      if (metaData.ratings[i] === undefined) {
        metaData.ratings[i] = 0;
      }
    }

    let ratingsTuples = Object.entries(metaData.ratings);

    return (
      <div className="rating-breakdown">
        <h2>Ratings and Reviews</h2>

        <div className="avg-rating"><span className='one-dec-avg'>{oneDecAvgRating}</span><AvgRatingStars avgRating={avgRating}/></div>


        <div className="rating-percentage-recommended">{percentageRecommended}% of reviews recommend this product</div>
        <br/>
        
        {ratingsTuples.map((ratingTuple) =>
          <RatingBar key={ratingTuple[0]} reviewCount={reviewCount} ratingTuple={ratingTuple} toggleStarRatingFilter={this.props.toggleStarRatingFilter} handleClearStarFilters={this.handleClearStarFilters}/>)}

        {this.props.clearFilterVisible &&
          <a onClick={this.props.handleClearStarFilters}>Clear all filters</a>
        }

      </div>
    );
  }
}

export default RatingBreakdown;



