import React from 'react';

//props should include an average star rating (int.)

const AvgRatingStars = function AvgRatingStars(props) {

  let avgRating = props.avgRating;
  let convertedRating = avgRating / 5 * 100;
  let roundedRating = Math.round(convertedRating / 5) * 5;

  return (
    <div>I'm a star! The avg is {avgRating}
      <div class="stars-outer">
        <div class="stars-inner" style={{width: roundedRating}}></div>
      </div>
    </div>
  );
};

export default AvgRatingStars;


/*

{<FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>}

*/