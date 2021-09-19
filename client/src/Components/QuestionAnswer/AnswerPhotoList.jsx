import React, { useState, useEffect } from 'react';
import AddAnswerModal from './AddAnswerModal.jsx';

var AnswerPhotoList = (props) => {
  const modalRef = React.useRef();

  var image = props.photos.map(photo => {
    return (
      <React.Fragment>
        <img key="{photo}" className="qa-photos-minus" src={photo.url} onClick={() => modalRef.current.open()}></img>
        <AddAnswerModal ref={modalRef} className>
          <img className="qa-photos-plus" src={photo.url}></img>
          <i class="fas fa-times fa-3x qa-photos-icon" onClick={() => modalRef.current.close()}></i>
        </AddAnswerModal>
      </React.Fragment>
    );
  });

  return (
    <p className="qa-photos-main">{image}</p>
  );

};

export default AnswerPhotoList;