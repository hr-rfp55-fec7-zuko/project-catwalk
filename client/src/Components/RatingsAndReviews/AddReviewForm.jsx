import React from 'react';
import ReactDom from 'react-dom';
import CharacteristicRadioFormField from './helpers/CharacteristicRadioFormField.jsx';
import StarPicker from './helpers/StarPicker.jsx';
import helpers from './helpers/helpers.js';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        rating: 0,
        summary: '',
        body: '',
        recommended: null,
        name: '',
        email: '',
        characteristics: {}
      },
      selectedImages: [], //local url
      imageFiles: [], //event.target.files
      submitted: false
    },

    this.handleStringFormChange = this.handleStringFormChange.bind(this);
    this.handleRadioFormChange = this.handleRadioFormChange.bind(this);
    this.handleStarSelect = this.handleStarSelect.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.submitReviewForm = this.submitReviewForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //########---State Updates---#######//
  setStateProperty(property, value) {
    // this.setState({ [property]: value });
    if (property.includes("characteristics")) {
      property = property.split("-");
      property = property[1];

      var characteristics = {...this.state.formData.characteristics}
      characteristics[property] = value;

      this.setState({formData: {...this.state.formData, characteristics: characteristics}})
    } else {
      this.setState({formData: {...this.state.formData, [property]: value} });
    }
  }

  //########---Form Submission---#######//
  submitReviewForm(event) {
    event.preventDefault();
    this.props.handleClick(event.target.id);

    var formData = this.state.formData;
    var hasValidationIssue = helpers.findFormIncompletes(formData);

    if (hasValidationIssue) {
      alert(hasValidationIssue)

    } else {
      if (this.state.selectedImages.length === 0) {
      // if (this.state.imageFiles.length === 0) {
        var dataBody = helpers.buildReviewObject(this.state.formData, this.props.product_id, this.props.characteristics, [])

        this.props.submitReviewForm(dataBody);

      } else {
        helpers.getPhotoURLs(this.state.imageFiles, (error, data) => {
          var dataBody = helpers.buildReviewObject(this.state.formData, this.props.product_id, this.props.characteristics, data)

          this.props.submitReviewForm(dataBody);
        })
      }
      this.closeModal();
    }
  }
  closeModal() {
    this.props.toggleAddReviewFormVisibility();
  }

  //########---Form Fill Handlers---#######//
  handleStringFormChange(event) {
    this.setStateProperty(event.target.name, event.target.value);
  }

  handleRadioFormChange(event) {
    this.setStateProperty(event.target.name, event.target.id);
  }

  handleStarSelect(name, id) {
    this.setStateProperty(name, id);
    this.handleStarColorChange(id);
  }

  handleStarColorChange(ratingValue) {
    return ratingValue <= this.state.rating ? '#ffc107' : '#e4e5e9';
  }

  handleImageChange(event) {
    event.preventDefault();
    if (event.target.files) {
      if (event.target.files.length > 5 || this.state.imageFiles.length > 5) {
        return alert('You may only upload up to 5 photos!');
      } else {
        var fileArray = Array.from(event.target.files);

        var selectedImageArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));

        this.setState(prevState => ({
          selectedImages: prevState.selectedImages.concat(selectedImageArray),
          imageFiles: prevState.imageFiles.concat(fileArray)
        }));

        Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
      }
    }
  }


  render() {
    let characteristics = this.props.characteristics;
    var characteristicsArray = Object.entries(characteristics);

    if (this.state.submitted) {
      var submissionConfirmation = <h2>Thank you for your feedback</h2>;
    } else {
      var submissionConfirmation = <></>;
    }

    return ReactDom.createPortal(

      <>

        <div className="add-review-modal-wrapper" >
          <div className="add-review-modal-backdrop" onClick={this.closeModal}></div>

          <div className="add-review-modal-box">
            {submissionConfirmation}

            <div className="add-review-form">
              <i className="fas fa-times fa-3x add-review-close-icon-modal" onClick={this.closeModal} />
              <h1>Write Your Review</h1>
              <h2>About {this.props.product_name}</h2><br />
              <form id="review-form" onSubmit={this.submitReviewForm}>

                <div className="form-question">
                  <label className='form-category'>What is your nickname?*</label><br />
                  <input type="text" maxLength={60} placeholder="jackson11!" id="name" name="name" value={this.state.name} onChange={this.handleStringFormChange} required />
                  <small><p>For privacy reasons, do not use your full name or email address</p></small>
                </div>

                <div className="form-question">
                  <label className='form-category'>Your email?*</label><br />
                  <input type="email" maxLength={60} placeholder="jackson11@email.com" id="email" name="email" value={this.state.email} onChange={this.handleStringFormChange} /><br />
                  <small><p>For privacy reasons, do not use your full name or email address</p></small>
                  <small><p>For authentication reasons, you will not be emailed</p></small>
                </div>

                <div className="form-question">
                  <label className="form-category">Overall Rating*</label><br />
                  <StarPicker rating={this.state.rating} handleStarSelect={this.handleStarSelect} />
                </div>

                <div className="form-question" onChange={this.handleRadioFormChange}>
                  <label className="form-category">Do you recommend this product?*</label><br />
                  <label htmlFor="Yes">Yes</label>
                  <input type="radio" id="Yes" name="recommended"></input>
                  <label htmlFor="No">No</label>
                  <input type="radio" id="No" name="recommended"></input>
                </div>

                <div className="form-question">
                  <label className="form-category">Characteristics*</label><br />
                  {characteristicsArray.map((characteristic) => <CharacteristicRadioFormField key={characteristic[1].id} characteristic={characteristic[0]} handleRadioFormChange={this.handleRadioFormChange} />)}
                </div>

                <div className="form-question">
                  <label className="form-category">Review Summary</label><br />
                  <input type="text" placeholder="Best purchase ever!" id="summary" name="summary" value={this.state.summary} onChange={this.handleStringFormChange} />
                </div>

                <div className="form-question">
                  <label className="form-category">Review Body*</label><br />
                  <textarea minLength={50} maxLength={1000} rows={5} cols={50} id="body" name="body" value={this.state.body} onChange={this.handleStringFormChange} placeholder="Why did you like the product or not?" /><br />

                  {this.state.formData.body && this.state.formData.body.length >= 50 ? <small>Minimum Reached</small> : <small>Review body must be at least 50 characters. {(50 - this.state.formData.body.length)} characters remaining. </small>}
                </div>

                <div className="form-question">
                  <label className="form-category">Upload your photos</label><br />
                  <input type="file" id="select-file" name="filename" className="add-review-modal-button" multiple={true} onChange={this.handleImageChange}></input><br />

                  {this.state.selectedImages && this.state.selectedImages.map((image) => {
                    return <img src={image} key={image} height="80" id="upload-image"></img>;
                  })}

                </div>

                <div className="form-question">
                  <button type="submit" className="add-review-modal-button" name="submit-review" id="submit-review" onClick={this.submitReviewForm}>Submit Reivew</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </>, document.getElementById('add-review-modal')
    );

  }
}

export default AddReviewForm;
