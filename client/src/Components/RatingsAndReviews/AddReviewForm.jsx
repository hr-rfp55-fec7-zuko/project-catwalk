import React from 'react';
import ReactDom from 'react-dom';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.closeModal = this.closeModal.bind(this);

    this.handleStringFormChange = this.handleStringFormChange.bind(this)
    this.handleRadioFormChange = this.handleRadioFormChange.bind(this)
  }

  submitReviewForm(event){
    event.preventDefault()
    this.props.submitReviewForm()

  }

  setStateProperty(property, value) {
    this.setState({[property]: value})
  }

  //NOTE: Star rating will need to change
  handleStringFormChange(event){
    this.setStateProperty(event.target.name, event.target.value)
  }

  handleRadioFormChange(event){
    this.setStateProperty(event.target.name, event.target.id)
  }


  closeModal() {
    this.props.toggleAddReviewFormVisible()
  }

  render() {
    let characteristics = this.props.characteristics;

    return ReactDom.createPortal(
      <div className="add-review-modal-wrapper" >
        <div className="add-review-modal-backdrop"></div>

        <div className="add-review-modal-box">
        <button type="button" onClick={this.closeModal}>Close Window</button>

        <div className="add-review-form">
          <h3>Write Your Review</h3>
          <h4>About {this.props.product_name}</h4><br/>
          <form id="review-form" onSubmit={this.submitReviewForm}>

          <div className="form-question">
            <label className='form-category'>What is your nickmake?*</label><br/>
            <input type="text" maxLength="60" placeholder="jackson11!" id= "name" name="name" value={this.state.name} onChange={this.handleStringFormChange}/>
            <small><p>For privacy reasons, do not use your full name or email address</p></small>
            </div>

            <div className="form-question">
            <label className='form-category'>Your email?*</label><br/>
            <input type="text" maxLength="60" placeholder="jackson11@email.com" id= "email" name="email" value={this.state.email} onChange={this.handleStringFormChange}/><br/>
            <small><p>For privacy reasons, do not use your full name or email address</p></small>
            <small><p>For authentication reasons, you will not be emailed</p></small>
            </div>

            <div className="form-question">
            <label className="form-category">Overall Rating*</label><br/>
            <input type="number" id="rating" name="rating" placeholder="This to be an interactive star picker" value={this.state.rating} onChange={this.handleStringFormChange}/>
            </div>

            <div className="form-question" onChange={this.handleRadioFormChange}>
            <label className="form-category">Do you recommend this product?*</label><br/>
            <label htmlFor="Yes">Yes</label>
            <input type="radio" id="Yes" name="recommended"></input>
            <label htmlFor="No">No</label>
            <input type="radio" id="No" name="recommended"></input>
            </div>

            <div className="form-question">
            <label className="form-category">Characteristics*</label><br/>
            <div onChange={this.handleRadioFormChange}>Placeholder Characteristic
            <label htmlFor="1">1</label>
            <input type="radio" id="1" name="characteristics.quality"></input>
            <label htmlFor="1">2</label>
            <input type="radio" id="2" name="characteristics.quality"></input>
            <label htmlFor="1">3</label>
            <input type="radio" id="3" name="characteristics.quality"></input>
            <label htmlFor="1">4</label>
            <input type="radio" id="4" name="characteristics.quality"></input>
            <label htmlFor="1">5</label>
            <input type="radio" id="5" name="characteristics.quality"></input>
            </div>
            </div>

            <div className="form-question">
            <label className="form-category">Review Summary</label><br/>
            <input type="text" placeholder="Best purchase ever!" id="summary" name="summary" value={this.state.summary} onChange={this.handleStringFormChange} />
            </div>


            <div className="form-question">
              <label className="form-category">Review Body*</label><br/>
              <textarea minLength="50" maxLength="1000" id="body" name="body" value={this.state.body} onChange={this.handleStringFormChange} placeholder="Add your review here" />
              {this.state.body && this.state.body.length >= 50 ? <small>Minimum Reached</small> : <small>Review body must be at least 50 characters</small>}
            </div>

            <div className="form-question">
            <label className="form-category">Uplaod your photos</label><br/>
            <input type="file" id="" name="filename"></input>
            <input type="button"></input>
            </div>

            <div className="form-question">
            <button type="submit" onClick={this.submitReviewForm}>Submit Reivew</button>
            </div>

          </form>
          </div>
        </div>
      </div>, document.getElementById('add-review-modal')
      );
  }
}

export default AddReviewForm;
