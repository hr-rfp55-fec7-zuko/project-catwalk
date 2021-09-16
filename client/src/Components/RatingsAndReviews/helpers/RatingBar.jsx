import React from 'react';

//props should include ratingsObj and reviewCount (int)
const RatingBars = function RatingBars(props) {
  let reviewCount = this.props.reviewCount;
  let ratingsObj = this.props.ratings;

  console.log('props', props, reviewCount, ratingsObj);

  const ratingBars = [];
  for (var i = 1; i <= 5; i++ ) {
    var rating = i;
    if (ratingsObj[i] === undefined) {
      ratingsObj[i] = 0;
    }

    let percentage = (ratingsObj[rating] / reviewCount) * 100;

    ratingBars.push (
      <>
        <div className="rating-bar-container">
          {rating} Stars
          <div className='rating-bar-outer'>
            <div className='rating-bar-inner-fill' style={{width: `${percentage}%`}}></div>
          </div>
          {ratingsObj[rating]}
        </div>
        <br/>
      </>
    );

    return (
      {ratingBars}
    );
  }

};


export default RatingBars;