import React from 'react';

const ComparisonModal = (props) => {
  const closeModal = (event) => {
    event.stopPropagation();
    props.closeModal();
  };

  const { parentProduct, compareProduct, comparedFeatures } = props;

  const renderProduct = (feature, index) => {
    return (
      <tr key={index}>
        <td className="check1">
          {parentProduct.features.find(
            (obj) => obj.value === feature.value
          ) ? (
            <span className='checkMark'>&#10003;</span>
          ) : (
            ''
          )}
        </td>
        <td className="check2">{feature.value}</td>
        <td>
          {compareProduct.features.find(
            (obj) => obj.value === feature.value
          ) ? (
            <span className='checkMark'>&#10003;</span>
          ) : (
            ''
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="ModalWrapper" onClick={closeModal}>
      <div className="Comparison">
        <div className="headerTitle">COMPARING
          <p className="closeButton" onClick={closeModal}><i className="fas fa-times"></i></p>
        </div>
        <div className="titleBox">
          <h3 className="title">{parentProduct.name}</h3>
          <h3 className="title right">{compareProduct.name}</h3>
        </div>
        <table id="tblFeatures">
          {props.comparedFeatures.map(renderProduct)}
        </table>
      </div>
    </div>
  );
};

export default ComparisonModal;