import React from 'react';

var SingleStyle = ({ selected, onClick, style }) => {
  return (
    <div className='style-element'>
      <img className={selected ? 'style-img' : 'style-img'} src={style.photos[0].thumbnail_url} onClick={onClick}
      />
      {selected && <i className="far fa-check-circle selected"></i>}
    </div>

  );
};

export default SingleStyle;