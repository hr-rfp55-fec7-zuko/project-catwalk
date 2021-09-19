import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

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
  // console.log('char', characteristic, 'score', score)

  //Math
  let overallPercentage = (score / 5 ) * 100;
  let fill1 = false;
  let fill2 = false;
  let fill3 = false;

  if (overallPercentage < 34) {
    var innerPercentage = `${(overallPercentage / 30) * 100}%;`;
    fill1 = true;

  } else if (overallPercentage < 67) {
    var innerPercentage = `${((overallPercentage - 33) / 30) * 100}%`;
    fill2 = true;

  } else if (overallPercentage < 101) {
    var innerPercentage = `${((overallPercentage - 66) / 30) * 100}%`;
    fill3 = true;
  }

return (
  <>
    <div className="product-bar-container">
    {/* {props.characteristic && <h5 className="">{characteristic}</h5>}<br/> */}

      <div className='product-bar-outer'>

        {buildBarSegment('one', fill1, innerPercentage)}
        {buildBarSegment('two', fill2, innerPercentage)}
        {buildBarSegment('three', fill3, innerPercentage)}
      </div>

      <div className='product-bar low-label'>{ratingMeanings[characteristic][0]}</div>
      <div className='product-bar high-label'>{ratingMeanings[characteristic][1]}</div>

    </div>

    <br/>
  </>
  );
};

const buildBarSegment = function(barNumber, isTargetBar, innerPercentage) {

  var target = isTargetBar ? 'target' : ''

  let className = `product-bar-inner-fill ${barNumber} ${target}`

  let styleObj = {'padding-left': innerPercentage}

  var bar = isTargetBar ? <div className={className} ><div className="product-bar carrat" style={ {paddingLeft: innerPercentage} }><FontAwesomeIcon icon={faCaretUp} size={'2x'}/></div></div> : <div className={className}/>

  return (bar)

}

export default ProductBar;


// <div className={className}>
//   <div className="product-bar carrat" style={styleObj}>
//     <FontAwesomeIcon icon={faCaretUp} />
//   </div>
// </div>

// <div className='rating-bar-inner-fill' style={{width: `${percentage}%`}}></div>







// style={{width: `${percentage}%`}}

// return (
  //   <>
  //     <div className="product-bar-container">
  //       <div className='product-bar-outer'>
  //         {fill1 === true ? targetBar : nonTargetBar}
  //         {ratingMeanings[characteristic][0]}
  //         {fill2 === true ? targetBar : nonTargetBar}
  //         {fill3 === true ? targetBar : nonTargetBar}
  //         {ratingMeanings[characteristic][1]}
  //       </div>
  //     </div>
  //     <br/>
  //   </>

  // //Styles
  // var style = {
  //   content: 'I\'m alive!'
  // };

  // //Variables for conditional rendering
  // var nonTargetBar = <div className='product-bar-inner-fill' />;
  // var targetBar = <div className='product-bar-inner-fill target' style={style} />;