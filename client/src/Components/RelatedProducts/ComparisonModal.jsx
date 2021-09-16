import React from 'react';
import axios from 'axios';

const ComparisonModal = (props) => {
  const closeModal = (event) => {
    event.stopPropagation();
    props.closeModal();
  };

  return (
    <div className="ModalWrapper" onClick={closeModal}>
      <div className="Comparison">
        <div className="headerTitle">COMPARING
          <p className="closeButton" onClick={closeModal}><i class="fas fa-times"></i></p>
        </div>
        <div className="titleBox">
          <h3 class="title">Morning Joggers</h3>
          <h3 class="title">Morning Joggers</h3>
        </div>
        <div className="featuresList">
          <div>fdh</div>
        </div></div>
    </div>
  );
};

export default ComparisonModal;