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

const determinePercentageRecommend = function(recommendedObject) {
  let totalReviews = recommendedObject[true] + recommendedObject[false];

  return (Math.round((recommendedObject[true] / totalReviews) * 100));


};

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let metaData = this.props.metaData;
    let reviewCount = this.props.reviewCount;

    let averageRating = determineAverageRating(metaData.ratings, reviewCount);

    let percentageRecommended = determinePercentageRecommend(metaData.recommended);


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



    return (
      <div className="rating-breakdown">
        <h3>Ratings and Reviews</h3>

        <div>{averageRating}</div>

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


/*

<div className='rating-breakdown'>
          <div className='rating-bar-outer'>
            <div className='rating-bar-inner'>
            </div>
          </div>
          {metaData.ratings['5']}
        </div>


        <div className='rating-breakdown'>
          <div className='rating-bar-outer'>
            <div className='rating-bar-inner'>
            </div>
          </div>
          {metaData.ratings['4']}
        </div>


*/