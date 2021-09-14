import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm.jsx';

//Receives product ID from RatingsAndReveiws

//Passes review object down to review tile.
class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewLimit: 2,
      addReviewFormVisible: false
    };

    this.toggleAddReviewFormVisible = this.toggleAddReviewFormVisible.bind(this);
  }

  toggleAddReviewFormVisible() {
    this.setState({
      addReviewFormVisible: !this.state.addReviewFormVisible
    });


  }

  render() {

    let reviews = this.props.reviews;
    let characteristics = this.props.characteristics;
    return (
      <div className="reviews-list">
        <h3>Review List Here</h3>
        {reviews.results.map((review) => {
          return <ReviewTile key={review.review_id} review={review}/>;
        })}
        <button type="button" id="more-reviews">More Reviews</button>
        <button type="button" id="add-review" onClick={this.toggleAddReviewFormVisible}>Add A Review</button>
        {this.state.addReviewFormVisible && <AddReviewForm characteristics={characteristics}/>}
      </div>
    );
  }
}

export default ReviewList;