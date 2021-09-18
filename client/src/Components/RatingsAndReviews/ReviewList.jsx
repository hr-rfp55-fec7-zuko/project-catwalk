import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews: 0,
      reviewLimit: 0,
      reviewPage: 1,
      addReviewFormVisible: false
      // addReviewFormVisible: true

    };

    this.toggleAddReviewFormVisible = this.toggleAddReviewFormVisible.bind(this);
    // this.requestProductReviews = this.requestProductReviews.bind(this);
    this.updateViewList = this.updateViewList.bind(this);
  }

  componentDidMount(){
    // this.requestProductReviews()
    this.updateViewList()
  }

  toggleAddReviewFormVisible() {
    this.setState({
      addReviewFormVisible: !this.state.addReviewFormVisible
    });
  }

  updateViewList(){
    //checks to see if the length of the reviews array is equal to the reviewLimit
    if (this.state.reviewLimit >= this.props.reviews.length) {
      //if so, it calls request product reviews this.state.reviewPage + 1
        this.props.requestProductReviews(this.state.reviewPage + 1)
        this.setState({
          reviewLimit: this.state.reviewLimit + 2,
          reviewPage: this.state.reviewPage + 1
        })
        //it the page count state by one and the viewable state by two
      //otherwise, it increments the viewable state by two
    } else {
      this.setState({reviewLimit: this.state.reviewLimit + 2})
    }
  }


  // requestProductReviews() {
  //   this.props.requestProductReviews();
  //   // this.setState({reviewLimit: this.state.reviewLimit + 2})
  // }

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
        <button type="button" id="more-reviews" className="ratings-button" onClick={this.updateViewList}>More Reviews</button>;
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