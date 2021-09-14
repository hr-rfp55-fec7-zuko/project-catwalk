import React from 'react';

const determineAverageRating = function(ratingsObject) {
  let total = 0;
  let reviewCount = 0;

  for (var rating in ratingsObject) {
    total += (rating * ratingsObject[rating]);
    reviewCount += parseInt(ratingsObject[rating]);
  }

  return (total / reviewCount).toFixed(2);

};

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let metaData = this.props.metaData;
    let reviewCount = this.props.reviewCount;

    let averageRating = determineAverageRating(metaData.ratings, reviewCount);




    return (
      <div className="rating-breakdown">
        <h3>Ratings and Reviews</h3>
        <div>{averageRating}</div>
        <div className="star-review-outer">
          star star star star star<div className="star-review-inner"></div>
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;