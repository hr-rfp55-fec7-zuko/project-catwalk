import React from 'react';


class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodtuctId: null
    };
  }

  render() {
    let characteristics = this.props.characteristics;

    return (
      <div className="add-review-form">
        <h3>Write Your Review</h3>
        <h4>About **Product Name Here**</h4>
        <form id="review-form">
          <label className="form-category">Overall Rating*</label>
          <div>1-5 star rating here</div>
          <label className="form-category">Do You Recommend This Product?*</label>
          <br>

          <label htmlFor="Yes">Yes</label>
          <input type="radio" id="Yes" name="do-you-recommend"></input>
          <label htmlFor="No">No</label>
          <input type="radio" id="No" name="do-you-recommend"></input>
          <br>

          <label className="form-category">Characteristics*</label>
          <div>Placeholder Characteristic</div>
          <label htmlFor="none-selected">None Selected</label>
          <input type="radio" id="none-selected" name="Placeholder Characteristic"></input>
          <label htmlFor="1">1</label>
          <input type="radio" id="1" name="Placeholder Characteristic"></input>
          <label htmlFor="1">2</label>
          <input type="radio" id="2" name="Placeholder Characteristic"></input>
          <label htmlFor="1">3</label>
          <input type="radio" id="3" name="Placeholder Characteristic"></input>
          <label htmlFor="1">4</label>
          <input type="radio" id="4" name="Placeholder Characteristic"></input>
          <label htmlFor="1">5</label>
          <input type="radio" id="5" name="Placeholder Characteristic"></input>
          <br>

          <label className="form-category">Review Summary</label>
          <input type="text" id="review-summary" name="review-summary" placeholder="Best purchase ever!"></input>
          <br>

          <label className="form-category">Review Body*</label>
          <textarea minLength="50" maxLength="1000"></textarea>
          <small><p>Placeholder: Minimum required characters left: ## OR Minimum Reached</p></small>
          <br>

          <label className="form-category">Uplaod your photos</label>
          <input type="file" id="" name="filename"></input>
          <input type="button"></input>
          <br>

          <label className='form-category'>What is your nickmake?*</label>
          <input type="text" id="your-nickname" name="your-nickname" maxLength="60" placeholder="jackson11!"></input>
          <small><p>For privacy reasons, do not use your full name or email address</p></small>
          <br>

          <label className='form-category'>Your email?*</label>
          <input type="text" id="your-email" name="your-email" maxLength="60" placeholder="jackson11@email.com"></input>
          <small><p>For privacy reasons, do not use your full name or email address</p></small>
          <small><p>For authentication reasons, you will not be emailed</p></small>
          <br>

          <button type="submit">Submit Reivew</button>

        </form>
      </div>
    );
  }
}

export default AddReviewForm;
