import React from 'react';

var QuantitySelector = ({totalQuantity = 0, setQuantity}) => {
  if (totalQuantity > 0) {
    var maxLimit = (totalQuantity <= 15 ) ? totalQuantity : 15;
    var quantOptions = [];
    for (var i = 1; i <= maxLimit; i++) {
      quantOptions.push(i);
    }
    return (
      <div>
        <select className='dropdown__quantity' onChange={(e) => {
          e.preventDefault();
          setQuantity(parseInt(event.target.value));
        }} >
          {quantOptions.map((opt) => (<option value={opt} key={opt} >{opt}</option>))}
        </select>
      </div>
    );
  } else {
    //setQuantity(0);
    return (
      <div>
        <select className='dropdown__quantity' >
          <option value=''>-</option>
        </select>
      </div>
    );
  }
};

export default QuantitySelector;