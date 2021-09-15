import React from 'react';

var SizeSelector = ({ skus, setSKU }) => {
  if (skus) {
    return (
      <div>
        <select className='po-select-size' onChange={(e) => {
          e.preventDefault();
          setSKU(event.target.value);
        }}>
          <option value=''>Select Size</option>
          {Object.keys(skus).map((sku) => {
            var size = skus[sku].size;
            var quantity = skus[sku].quantity;
            if (size === 0) {
              return (<option value={sku} disabled >{size} OUT OF STOCK</option>);
            } else {
              return (<option value={sku} >{size}</option>);
            }
          })}
        </select>
      </div>
    );
  } else {
    return null;
  }
};

export default SizeSelector;