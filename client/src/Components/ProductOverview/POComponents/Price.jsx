import React from 'react';

var Price = (props) => {
  if (props.sale) {
    return (
      <div className='price'>
        <span className='sale-price' >${props.salePrice}  </span><del>{props.price}</del>
      </div>
    );
  } else {
    return (
      <div className ='price'>
        ${props.price}
      </div>
    );
  }
};

export default Price;