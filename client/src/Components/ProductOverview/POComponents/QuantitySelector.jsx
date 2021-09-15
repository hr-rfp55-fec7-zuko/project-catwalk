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
        <select id='po-select-qty' onChange={(e) => {
          e.preventDefault();
          setQuantity(parseInt(event.target.value));
        }} >
          {quantOptions.map((opt) => (<option value={opt} >{opt}</option>))}
        </select>
      </div>
    );
  }
  return (
    <div>
      <select id='po-select-qty' >
        <option value=''>-</option>
      </select>
    </div>
  );
};

export default QuantitySelector;