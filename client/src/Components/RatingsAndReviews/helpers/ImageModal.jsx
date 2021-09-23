import React from 'react';
import ReactDom from 'react-dom';

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.toggleImageModalVisibility();
  }

  render() {

    return ReactDom.createPortal(

      <>
        <div className="add-review-modal-wrapper" >
          <div className="add-review-modal-backdrop" onClick={this.closeModal}></div>

        </div>

        <div className="add-review-modal-box">
        <i className="fas fa-times fa-3x add-review-close-icon-modal" onClick={this.closeModal} />
        <img src={this.props.thumbnailURL} width='100%' height ='100%' aria-label="customer's product"></img>
      </div>
    </>, document.getElementById('add-review-modal')

    );

  }
}

export default ImageModal;

