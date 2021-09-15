import React from 'react';

var SingleStyle = ({ selected, onClick, style }) => {
  return (
    <div className='style-element'>
      <img className={selected ? 'style-img selected' : 'style-img'} src={style.photos[0].thumbnail_url} onClick={onClick}
      />
    </div>

  );
};

export default SingleStyle;