import React from 'react';

const ComparisonModal = (props) => {
  const closeModal = (event) => {
    event.stopPropagation();
    props.closeModal();
  };
  const { parentProduct, compareProduct } = props;

  return (
    <div className="ModalWrapper" onClick={closeModal}>
      <div className="Comparison">
        <div className="headerTitle">COMPARING
          <p className="closeButton" onClick={closeModal}><i class="fas fa-times"></i></p>
        </div>
        <div className="titleBox">
          <h3 className="title">{parentProduct}</h3>
          <h3 className="title right">{compareProduct}</h3>
        </div>
        <div className="featuresList">
          <div>&#10003;</div>
          <div>Fabric</div>
          <div>&#10003;</div>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;