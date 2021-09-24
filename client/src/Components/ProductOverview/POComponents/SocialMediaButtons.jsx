import React from 'react';

var SocialMediaButtons = (props) => {
  return (
    <div className='po-soc-med-btns'>
      <a href='https://www.facebook.com/' target='_blank'>
        <i className='fab fa-facebook fa-2x soc-btn'></i>
      </a>
      <a href='https://www.twitter.com/'>
        <i className='fab fa-twitter fa-2x soc-btn'></i>
      </a>
      <a href='https://www.pinterest.com/pin/create/button/' data-pin-do='buttonBookmark' data-pin-custom target='_blank'>
        <i className='fab fa-pinterest fa-2x soc-btn'></i>
      </a>
      <a href='https://www.instagram.com/' target='_blank'>
        <i className='fab fa-instagram fa-2x soc-btn'></i>
      </a>
    </div>
  );
};

export default SocialMediaButtons;