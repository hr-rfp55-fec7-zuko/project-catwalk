import React from 'react';

const ratingMeanings = {
  'Size': ['A size too small', 'A size too wide'],
  'Width': ['Too narrow', 'Too wide'],
  'Comfort': ['Uncomfortable', 'Perfect'],
  'Quality': ['Poor', 'Perfect'],
  'Length': ['Runs Short', 'Runs long'],
  'Fit': ['Runs tight', 'Runs long']
};

//props should include
const ProductBar = function ProductBar(props) {
  let characteristic = props.characteristic;
  let score = parseFloat(props.score);

  console.log(characteristic, score);

  //Math
  let overallPercentage = (score / 5 ) * 100;
  let fill1 = false;
  let fill2 = false;
  let fill3 = false;

  if (overallPercentage < 34) {
    var innerPercentage = overallPercentage / 30;
    fill1 = true;

  } else if (overallPercentage < 67) {
    var innerPercentage = (overallPercentage - 33) / 30;
    fill2 = true;

  } else if (overallPercentage < 101) {
    var innerPercentage = (overallPercentage - 66) / 30;
    fill3 = true;
  }

  //Styles
  var style = {
    content: 'I\'m alive!'
  };

  //Variables for conditional rendering
  var nonTargetBar = <div className='product-bar-inner-fill' />;
  var targetBar = <div className='product-bar-inner-fill-target' style={style} />;

  return (
    <>
      <div className="product-bar-container">
        <div className='product-bar-outer'>
          {fill1 === true ? targetBar : nonTargetBar}
          {ratingMeanings[characteristic][0]}
          {fill2 === true ? targetBar : nonTargetBar}
          {fill3 === true ? targetBar : nonTargetBar}
          {ratingMeanings[characteristic][1]}
        </div>
      </div>
      <br/>
    </>
  );
};


export default ProductBar;

// style={{width: `${percentage}%`}}

