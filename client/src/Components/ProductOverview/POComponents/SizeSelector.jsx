import React from 'react';

var SizeSelector = ({ skus, setSKU, needSize, outOfStock }) => {

  if (skus) {

    if (!outOfStock) {
      return (
        <div>
          <select
            className='dropdown__select'
            size={needSize ? Object.keys(skus).length : 1}
            onChange={(e) => {
              e.preventDefault();
              setSKU(event.target.value);
            }}>
            <option value='0' key='select-size' >Select Size</option>
            {Object.keys(skus).map((sku) => {
              var size = skus[sku].size;
              var quantity = skus[sku].quantity;
              if (size === 0) {
                return (<option value={sku} key={sku} disabled >{size} OUT OF STOCK</option>);
              } else {
                return (<option value={sku} key={sku} >{size}</option>);
              }
            })}
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <select
            className='dropdown__select'
            disabled
            style={
              {padding: '15px 10px'}
            } >
            <option value='0' key='select-size' >Out of Stock</option>
          </select>
        </div>
      );
    }
  } else {
    return null;
  }
};

export default SizeSelector;