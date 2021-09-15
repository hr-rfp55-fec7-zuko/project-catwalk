import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


//props should include an average star rating (int.)
const AvgRatingStars = function AvgRatingStars(props) {

  let star = <FontAwesomeIcon icon={faStar}/>;
  return (
    <div>I'm a star! The avg is {props.avgRating}

      <div class="stars-outer">

        <div classs="stars-inner"></div>
      </div>



    </div>
  );
};

export default AvgRatingStars;


/*

{<FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>}

*/