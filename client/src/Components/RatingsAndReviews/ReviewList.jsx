import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews: 0,
      reviewLimit: 2,
      addReviewFormVisible: false
      // addReviewFormVisible: true

    };

    this.toggleAddReviewFormVisible = this.toggleAddReviewFormVisible.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
  }

  toggleAddReviewFormVisible() {
    this.setState({
      addReviewFormVisible: !this.state.addReviewFormVisible
    });
  }

  requestProductReviews() {
    this.props.requestProductReviews();
  }

  render() {
    let reviews = this.props.reviews;
    let characteristics = this.props.characteristics;

    //If there are no reviews, don't render the list.
    if (reviews.results.length > 0) {
      var reviewList =
      reviews.results.map((review) => {
        return <ReviewTile key={review.review_id} review={review} submitHelpfulOrReport={this.props.submitHelpfulOrReport}/>;
      });
    } else {
      var reviewList = <></>;
    }

    //If the total number of reviews has been reached, don't render the addreviews button
    if (reviews.results.length < this.props.reviewCount) {
      var moreReviewsButton =
        <button type="button" id="more-reviews" onClick={this.requestProductReviews}>More Reviews</button>;
    } else {
      var moreReviewsButton = <></>;
    }

    return (
      <>
        <h3>Review List Here</h3>
        <div className="review-list">

          {reviewList}

          {moreReviewsButton}

          <button type="button" id="add-review" onClick={this.toggleAddReviewFormVisible}>Add A Review</button>

          {this.state.addReviewFormVisible && <AddReviewForm characteristics={characteristics} product_name={this.props.product_name} toggleAddReviewFormVisible={this.toggleAddReviewFormVisible} submitReviewForm={this.props.submitReviewForm}product_id={this.props.product_id}/>}

        </div>
      </>
    );
  }
}

export default ReviewList;


/*
.button {
  position: relative;
}

.button .icon {
  position: absolute;
}

<button class="button"><p class="i"></button> */