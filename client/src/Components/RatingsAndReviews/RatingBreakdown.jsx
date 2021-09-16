import React from 'react';
import helpers from './helpers/helpers.js';
import AvgRatingStars from './helpers/AvgRatingStars.jsx';
import RatingBars from './helpers/RatingBar.jsx';

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
    for (var i = 1; i <= 5; i++ ) {
      var rating = i;
      if (metaData.ratings[i] === undefined) {
        metaData.ratings[i] = 0;
      }

      let percentage = (metaData.ratings[rating] / this.props.reviewCount) * 100;

      ratingBars.push (
        <>
          <div className="rating-bar-container">
            {rating} Stars
            <div className='rating-bar-outer'>
              <div className='rating-bar-inner-fill' style={{width: `${percentage}%`}}></div>
            </div>
            {metaData.ratings[rating]}
          </div>
          <br/>
        </>
      );
    }

    console.log(reviewCount, metaData.ratings);

    //NOTE: for star icon: <i class="far fa-star"></i>
    return (
      <div className="rating-breakdown">
        <h3>Ratings and Reviews</h3>
        <div> {percentageRecommended}% of reviews recommend this product</div>
        <AvgRatingStars avgRating={avgRating}/>
        <br/>
        {ratingBars}
        {/* <RatingBars reviewCount={reviewCount} ratingsObj={metaData.ratings}/> */}
      </div>

    );
  }
}

export default RatingBreakdown;



