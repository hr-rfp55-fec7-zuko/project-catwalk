import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm.jsx';

//Receives product ID from RatingsAndReveiws

//Passes review object down to review tile.
class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews: 0,
      reviewLimit: 2,
      addReviewFormVisible: false
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
    //star icon: <i class="far fa-star"></i>
    let reviews = this.props.reviews;
    let characteristics = this.props.characteristics;

    if (reviews.results.length > 0) {
      var reviewList =
      reviews.results.map((review) => {
        return <ReviewTile key={review.review_id} review={review}/>;
      });
    } else {
      var reviewList = <></>;
    }


    if (reviews.results.length < this.props.reviewCount) {
      var moreReviewsButton =
        <button type="button" id="more-reviews" onClick={this.requestProductReviews}>More Reviews</button>;
    } else {
      var moreReviewsButton = <></>;
    }

    return (
      // <div className="review-list">
      <>
        <h3>Review List Here</h3>
        <div className="review-list">

          {reviewList}

          {moreReviewsButton}

          <button type="button" id="add-review" onClick={this.toggleAddReviewFormVisible}>Add A Review</button>


          {this.state.addReviewFormVisible && <AddReviewForm characteristics={characteristics}/>}


        </div>
      </>
    );
  }
}

export default ReviewList;


/*


          {reviews.results.length <= this.props.reviewCount &&
            <button type="button" id="more-reviews" onClick={this.requestProductReviews}>More Reviews</button>
          }



                    {reviews.results.length <= this.props.reviewCount &&
            <button type="button" id="more-reviews" onClick={this.requestProductReviews}>More Reviews</button>
          }
*/