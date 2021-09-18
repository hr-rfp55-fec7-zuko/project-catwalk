import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews: 0,
      reviewLimit: 0,
      //review  page?
      addReviewFormVisible: false
      // addReviewFormVisible: true

    };

    this.toggleAddReviewFormVisible = this.toggleAddReviewFormVisible.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
  }

  componentDidMount(){
    this.requestProductReviews()
  }

  toggleAddReviewFormVisible() {
    this.setState({
      addReviewFormVisible: !this.state.addReviewFormVisible
    });
  }



  requestProductReviews() {
    this.props.requestProductReviews();
    this.setState({reviewLimit: this.state.reviewLimit + 2})
  }

  //Re-set review viewable count when submitted? Maybe use for filtering?
  // this.submitHelpfulOrReport{
  //   this.setState({})
  //   this.props.submitHelpfulOrReport()

  // }

  render() {
    let reviews = this.props.reviews;
    let characteristics = this.props.characteristics;

    //If there are no reviews, don't render the list.
    if (reviews.length > 0) {
      var reviewList = [];

      for (var i = 0; i < this.state.reviewLimit; i++) {
        let review = reviews[i]
        reviewList.push(<ReviewTile key={review.review_id} review={review} submitHelpfulOrReport={this.props.submitHelpfulOrReport}/>)
      }


      // reviews.map((review) => {
      //   return <ReviewTile key={review.review_id} review={review} submitHelpfulOrReport={this.props.submitHelpfulOrReport}/>;
      // });
    } else {
      var reviewList = <></>;
    }

    //If the total number of reviews has been reached, don't render the addreviews button
    if (reviews.length < this.props.reviewCount) {
      var moreReviewsButton =
        <button type="button" id="more-reviews" className="ratings-button" onClick={this.requestProductReviews}>More Reviews</button>;
    } else {
      var moreReviewsButton = <></>;
    }

    return (
      <>
        <div className="review-list">

          {reviewList}

          {moreReviewsButton}

          <button type="button" id="add-review" onClick={this.toggleAddReviewFormVisible} className='ratings-button'>Add A Review  +</button>

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