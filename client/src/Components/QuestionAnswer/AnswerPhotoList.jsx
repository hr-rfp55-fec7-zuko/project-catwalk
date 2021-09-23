import React, { useState, useEffect } from 'react';
import AddAnswerModal from './AddAnswerModal.jsx';

var AnswerPhotoList = (props) => {
  const modalRef = React.useRef();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  var handleImageClicked = (e) => {
    return (
      modalRef.current.open(),
      setSelectedPhoto(e.target.currentSrc)
    );
  };

  var image = props.photos.map(photo => {
    return (
      <React.Fragment key={photo.id}>
        <img className="qa-photos-minus" src={photo.url} onClick={handleImageClicked}></img>
        <AddAnswerModal ref={modalRef}>
          <img className="qa-photos-plus" src={selectedPhoto}></img>
          <i className="fas fa-times fa-3x qa-photos-icon" onClick={() => modalRef.current.close()}></i>
        </AddAnswerModal>
      </React.Fragment>
    );
  });

  return (
    <p className="qa-photos-main">{image}</p>
  );

};

export default AnswerPhotoList;