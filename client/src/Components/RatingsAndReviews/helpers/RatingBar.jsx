import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar  } from '@fortawesome/free-solid-svg-icons';
// // import { faStar } from 'react-icons/fa'

//props should include one tuple ([value, freq]) and reviewCount (int)
const RatingBar = function RatingBar(props) {
  let value = props.ratingTuple[0];
  let frequency = props.ratingTuple[1];
  let reviewCount = props.reviewCount;
  let percentage = (frequency / reviewCount) * 100;

  return (
    <>
      <div className={'rating-bar-container ' + value} onClick={props.toggleStarRatingFilter}>
        <span className={'star-label ' + value}> {value} Stars </span>
        <div className={'rating-bar-outer ' + value}>
        <div className={'rating-bar-inner-fill ' + value} style={{width: `${percentage}%`}}></div>
        </div>
        {frequency}
      </div>
      <br/>
    </>
  );
};


export default RatingBar;

/*

<div className='rating-bar-inner-fill' style={{width: `${percentage}%`}}></div>

*/

