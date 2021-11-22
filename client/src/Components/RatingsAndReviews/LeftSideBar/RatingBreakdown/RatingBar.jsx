import React from 'react';

const RatingBar = function RatingBar(props) {
  let value = props.ratingTuple[0];
  let frequency = props.ratingTuple[1];
  let reviewCount = props.reviewCount;
  let percentage = (frequency / reviewCount) * 100;

  return (
    <>
      <div className={props.starFilters.includes(parseInt(value)) ? `rating-bar-container ${value} filtered` : `rating-bar-container ${value}`} onClick={props.toggleStarRatingFilter}>
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
