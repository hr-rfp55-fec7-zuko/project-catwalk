import React from 'react';
import ReactDom from 'react-dom';

import CharacteristicRadioFormField from './helpers/CharacteristicRadioFormField.jsx'



class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   'product_id': this.props.product_id,
    //   rating: '',
    //   summary: '',
    //   body: '',
    //   recommended: '',
    //   name: '',
    //   email: '',
    //   photos: [],
    // }

    this.state = {
      submissions: {
        'product_id': this.props.product_id,
        rating: '',
        summary: '',
        body: '',
        recommended: '',
        name: '',
        email: '',
        photos: [],
      },
      submitted: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.handleStringFormChange = this.handleStringFormChange.bind(this)
    this.handleRadioFormChange = this.handleRadioFormChange.bind(this)
    this.submitReviewForm = this.submitReviewForm.bind(this)
  }

  submitReviewForm(event){
    event.preventDefault()

    let characteristics = {}

    for (var property in this.state) {
      if (!this.state[property]) {
        alert(`Please complete required fields: ${property}`)
      }

      if (property.includes('characteristics')) {
        var splitInput = property.split('.')
        var newProperty = splitInput[1]
        dataBody.characteristics[newProperty] = this.state[property]
      }

      var dataBody = {
        'product_id': parseInt(this.state.product_id),
        'rating': parseInt(this.state.rating),
        'summary': this.state.summary + '',
        'body': this.state.body + '',
        'recommended': this.state.recommended === 'No' ? false : true,
        'email': this.state.email + '',
        'photos': this.state.photos,
        'characteristics': characteristics
      }

      // dataBody['product_id'] = parseInt(this.state.rating)
      // dataBody['rating'] = parseInt(this.state.rating)
      // dataBody['summary'] = this.state.summary + ''
      // dataBody['body'] = this.state.body + ''
      // dataBody['recommended'] = this.state.recommended === 'No' ? false : true
      // dataBody['email'] = this.state.email + ''
      // dataBody['photos'] = this.state.photos
    }

    // console.log('dataBody', dataBody)

    //format data object

    //if any mandatory fields are blank display an error (h)

    let temp = {
      "product_id": 40344,
      "rating": 5,
      "summary": "Very good",
      "body": "lorem ipsum",
      "recommend": true,
      "name": "tester",
      "email": "tester@tester.com",
      "photos": [],
      "characteristics": {}
    }
    // console.log(dataBody)
    this.props.submitReviewForm(temp)
    // this.props.submitReviewForm(dataBody)
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
    var characteristicsArray = Object.entries(characteristics);

    if (this.state.submitted) {
      var submissionConfirmation = <h2>Thank you for your feedback</h2>
    } else {
      var submissionConfirmation = <></>
    }

    return ReactDom.createPortal(



      <div className="add-review-modal-wrapper" >
        <div className="add-review-modal-backdrop"></div>

        <div className="add-review-modal-box">

        {submissionConfirmation}

        <div className="add-review-form">
          <h3>Write Your Review</h3>
          <h4>About {this.props.product_name}</h4><br/>
          <form id="review-form" onSubmit={this.submitReviewForm}>

          <div className="form-question">
            <label className='form-category'>What is your nickmake?*</label><br/>
            <input type="text" maxLength="60" placeholder="jackson11!" id= "name" name="name" value={this.state.name} onChange={this.handleStringFormChange} required/>
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
                {characteristicsArray.map((characteristic) => <CharacteristicRadioFormField key={characteristic[1].id} characteristic={characteristic[0]} handleRadioFormChange={this.handleRadioFormChange}/>)}
            </div>

            <div className="form-question">
            <label className="form-category">Review Summary</label><br/>
            <input type="text" placeholder="Best purchase ever!" id="summary" name="summary" value={this.state.summary} onChange={this.handleStringFormChange} />
            </div>

            <div className="form-question">
              <label className="form-category">Review Body*</label><br/>
              <textarea minLength="50" maxLength="1000" id="body" name="body" value={this.state.body} onChange={this.handleStringFormChange} placeholder="Add your review here" /><br/>
              {this.state.body && this.state.body.length >= 50 ? <small>Minimum Reached</small> : <small>Review body must be at least 50 characters</small>}
            </div>

            <div className="form-question">
            <label className="form-category">Uplaod your photos</label><br/>
            <input type="file" id="select-file" name="filename" className="add-review-modal-button"></input>
            {/* <input type="button" className="add-review-modal-button"></input> */}
            </div>

            <div className="form-question">
            <button type="submit" className="add-review-modal-button" onClick={this.submitReviewForm}>Submit Reivew</button>
            <button type="button" className="add-review-modal-button" onClick={this.closeModal}>Close Window</button>
            </div>

          </form>
          </div>
        </div>
      </div>, document.getElementById('add-review-modal')
      );

  }
}

export default AddReviewForm;


/*

Radio button alts

{characteristicsArray.map((characteristic) => <CharacteristicRadioFormField key={characteristic[1].id} characteristic={characteristic[0]} handleRadioFormChange={this.handleRadioFormChange}/>)}

            {/* {characteristics.Quality &&
            <>
            <div onChange={this.handleRadioFormChange} className='characteristic-form-field'>
            <h3 className='form-sub-head'>Quality</h3>


            <label htmlFor="1" className='characteristic-form-label'>1</label>
            <input type="radio" id="1" name="characteristics.quality" className='form-radio-button'/>

            <label htmlFor="2" className='characteristic-form-label'>2</label>
            <input type="radio" id="2" name="characteristics.quality" className='form-radio-button'/>

            <label htmlFor="3" className='characteristic-form-label'>3</label>
            <input type="radio" id="3" name="characteristics.quality" className='form-radio-button'/>

            <label htmlFor="4" className='characteristic-form-label'>4</label>
            <input type="radio" id="4" name="characteristics.quality" className='form-radio-button'/>

            <label htmlFor="5" className='characteristic-form-label'>5</label>
            <input type="radio" id="5" name="characteristics.quality" className='form-radio-button'/>

            </div>
            </>

            }


             <div onChange={this.handleRadioFormChange}>Quality
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

*/

/*

    return ReactDom.createPortal(
      <div className="add-review-modal-wrapper" >
        <div className="add-review-modal-backdrop"></div>

        <div className="add-review-modal-box">
        <button type="button" className="add-review-modal-button" onClick={this.closeModal}>Close Window</button>

        <div className="add-review-form">
          <h3>Write Your Review</h3>
          <h4>About {this.props.product_name}</h4><br/>
          <form id="review-form" onSubmit={this.submitReviewForm}>

          <div className="form-question">
            <label className='form-category'>What is your nickmake?*</label><br/>
            <input type="text" maxLength="60" placeholder="jackson11!" id= "name" name="name" value={this.state.name} onChange={this.handleStringFormChange} required/>
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
                {characteristicsArray.map((characteristic) => <CharacteristicRadioFormField key={characteristic[1].id} characteristic={characteristic[0]} handleRadioFormChange={this.handleRadioFormChange}/>)}
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
            <button type="submit" className="add-review-modal-button" onClick={this.submitReviewForm}>Submit Reivew</button>
            </div>

          </form>
          </div>
        </div>
      </div>, document.getElementById('add-review-modal')
      );

*/


/*



    if (this.state.submitted = true) {
      var reviewFormDisplay =
        <div className='form-submitted'>Your feedback has been submitted.</div>
    } else {
      var reviewFormDisplay =
      <div className="add-review-modal-wrapper" >
        <div className="add-review-modal-backdrop"></div>

        <div className="add-review-modal-box">
        <button type="button" className="add-review-modal-button" onClick={this.closeModal}>Close Window</button>

        <div className="add-review-form">
          <h3>Write Your Review</h3>
          <h4>About {this.props.product_name}</h4><br/>
          <form id="review-form" onSubmit={this.submitReviewForm}>

          <div className="form-question">
            <label className='form-category'>What is your nickmake?*</label><br/>
            <input type="text" maxLength="60" placeholder="jackson11!" id= "name" name="name" value={this.state.name} onChange={this.handleStringFormChange} required/>
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
                {characteristicsArray.map((characteristic) => <CharacteristicRadioFormField key={characteristic[1].id} characteristic={characteristic[0]} handleRadioFormChange={this.handleRadioFormChange}/>)}
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
            <button type="submit" className="add-review-modal-button" onClick={this.submitReviewForm}>Submit Reivew</button>
            </div>

          </form>
          </div>
        </div>
      </div>

    }

    return ReactDom.createPortal(reviewFormDisplay, document.getElementById('add-review-modal'));

    */