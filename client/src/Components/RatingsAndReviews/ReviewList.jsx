import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm.jsx';
import ImageModal from './helpers/ImageModal.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews: 0,
      reviewLimit: 0,
      reviewPage: 1,
<<<<<<< HEAD
      addReviewFormVisible: false,
      // addReviewFormVisible: true
      imageModalVisible: false,
      thumbnailURL: null
=======
      // addReviewFormVisible: false
      addReviewFormVisible: true
>>>>>>> master

    };

    this.toggleAddReviewFormVisible = this.toggleAddReviewFormVisible.bind(this);
    this.updateViewList = this.updateViewList.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.toggleImageModalVisiblity = this.toggleImageModalVisiblity.bind(this);
  }

  componentDidMount() {
    this.updateViewList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product_id !== this.props.product_id) {
      this.props.requestProductReviews();
    }
  }

  toggleAddReviewFormVisible() {
    this.setState({
      addReviewFormVisible: !this.state.addReviewFormVisible
    });
  }

  updateViewList() {
    if (this.state.reviewLimit >= this.props.reviews.length) {
      this.props.requestProductReviews(this.state.reviewPage + 1);
      this.setState({
        reviewLimit: this.state.reviewLimit + 2,
        reviewPage: this.state.reviewPage + 1
      });
    } else {
      this.setState({reviewLimit: this.state.reviewLimit + 2});
    }
  }

  handleThumbnailClick(thumbnailURL) {
    console.log('thumbnailURL', thumbnailURL);
    this.setState({imageModalVisible: !this.state.imageModalVisible, thumbnailURL: thumbnailURL});
  }

  toggleImageModalVisiblity() {
    this.setState({imageModalVisible: false, thumbnailURL: null});
  }


  render() {
    let reviews = this.props.reviews;
    let characteristics = this.props.characteristics;

    if (reviews.length > 0) {
      var reviewList = [];

      if (this.props.reviews.length <= this.state.reviewLimit) {
        var listLength = this.props.reviews.length;
      } else {
        var listLength = this.state.reviewLimit;
      }

      for (var i = 0; i < listLength; i++) {
        let review = reviews[i];
        if (this.props.starFilters.length > 0) {
          if (this.props.starFilters.includes(review.rating.toString())) {
            reviewList.push(
              <ReviewTile key={review.review_id} review={review} submitHelpfulOrReport={this.props.submitHelpfulOrReport} handleThumbnailClick={this.handleThumbnailClick} toggleImageModalVisiblity={this.toggleImageModalVisiblity} />
            );
          } else {
            listLength ++;
          }
        } else {
          reviewList.push(
            <ReviewTile key={review.review_id} review={review} submitHelpfulOrReport={this.props.submitHelpfulOrReport} handleThumbnailClick={this.handleThumbnailClick} toggleImageModalVisiblity={this.toggleImageModalVisiblity} />
          );
        }
      }
    } else {
      var reviewList = <></>;
    }

    if (this.state.reviewLimit <= this.props.reviews.length) {
      var moreReviewsButton =
        <button type="button" id="more-reviews" className="ratings-button" onClick={this.updateViewList}>More Reviews</button>;
    } else {
      var moreReviewsButton = <></>;
    }

    if (this.state.imageModalVisible) {
      var imageModal = <ImageModal key={this.state.thumbnail} thumbnailURL={this.state.thumbnailURL} toggleImageModalVisibility={this.toggleImageModalVisiblity}/>;
    } else {
      var imageModal = <></>;
    }

    return (
      <>
        <div className="review-list">

          {reviewList}

          {imageModal}

          {moreReviewsButton}

          <button type="button" id="add-review" onClick={this.toggleAddReviewFormVisible} className='ratings-button'>Add A Review  +</button>

          {this.state.addReviewFormVisible && <AddReviewForm characteristics={characteristics} product_name={this.props.product_name} toggleAddReviewFormVisible={this.toggleAddReviewFormVisible} submitReviewForm={this.props.submitReviewForm}product_id={this.props.product_id} />}

        </div>
      </>
    );
  }
}

export default ReviewList;