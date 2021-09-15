import React from 'react';

//props should include an average star rating (int.)

const AvgRatingStars = function AvgRatingStars(props) {

  let avgRating = parseFloat(props.avgRating);
  let convertedRating = avgRating / 5 * 100;
  let roundedRating = (Math.round(convertedRating / 5) * 5);

  return (
    <div className="stars-outer">
      <div className="stars-inner" style={{width: `${roundedRating}%`}}></div>
    </div>

  );

};

export default AvgRatingStars;
