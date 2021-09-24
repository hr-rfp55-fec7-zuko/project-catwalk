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
    let avgRating = helpers.determineAverageRating(metaData.ratings);
    let oneDecAvgRating = helpers.truncateAverageRating(avgRating);
    let percentageRecommended = helpers.determinePercentageRecommend(metaData.recommended);

    for (var i = 1; i <= 5; i++ ) {
      if (metaData.ratings[i] === undefined) {
        metaData.ratings[i] = 0;
      }
    }

    let ratingsTuplesAscendingOrder = Object.entries(metaData.ratings);

    let ratingsTuplesDescending = [];

    for (var j = ratingsTuplesAscendingOrder.length - 1; j > -1; j--) {
      ratingsTuplesDescending.push(ratingsTuplesAscendingOrder[j]);
    }

    return (
      <div className="rating-breakdown">
        <h2>Ratings and Reviews</h2>
        <div className="avg-rating"><span className='one-dec-avg'>{oneDecAvgRating}</span><AvgRatingStars avgRating={avgRating}/></div>
        <div className="rating-percentage-recommended">{percentageRecommended}% of reviews recommend this product</div>
        <br/>

        {ratingsTuplesDescending.map((ratingTuple) =>
          <RatingBar key={ratingTuple[0]} reviewCount={reviewCount} ratingTuple={ratingTuple} toggleStarRatingFilter={this.props.toggleStarRatingFilter} handleClearStarFilters={this.handleClearStarFilters} starFilters={this.props.starFilters}/>)
        }

        {this.props.clearFilterVisible &&
          <>
            <span>Currently filtering: </span>
            <a onClick={this.props.handleClearStarFilters}>Clear all filters</a> <br />
          </>
        }

      </div>
    );
  }
}

export default RatingBreakdown;



