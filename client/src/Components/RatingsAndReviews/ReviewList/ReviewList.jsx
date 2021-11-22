import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import AddReviewForm from './AddReviewForm/AddReviewForm.jsx';
import ImageModal from './ImageModal.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalReviews: 0,
      reviewLimit: 0,
      reviewPage: 1,
      addReviewFormVisible: false,
      imageModalVisible: false,
      thumbnailURL: null

    };

    this.toggleAddReviewFormVisibility = this.toggleAddReviewFormVisibility.bind(this);
    this.handleMoreReviewsClick = this.handleMoreReviewsClick.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
    this.toggleImageModalVisiblity = this.toggleImageModalVisiblity.bind(this);
    this.findReviews = this.findReviews.bind(this);

  }


  //########---Modal Toggles---#######//
  toggleAddReviewFormVisibility(e) {
    if (e) {
      this.props.handleClick(e.target.id);
    }

    this.setState({
      addReviewFormVisible: !this.state.addReviewFormVisible
    });
  }

  toggleImageModalVisiblity() {
    this.setState({imageModalVisible: false, thumbnailURL: null});
  }

  //########---Click Handlers---#######//
  handleMoreReviewsClick(e) {
    if (e.target.id) {
      this.props.handleClick(e.target.id);
    }

    this.findReviews();
  }

  handleThumbnailClick(thumbnailURL) {
    this.setState({imageModalVisible: !this.state.imageModalVisible, thumbnailURL: thumbnailURL});
  }

  //########---Lifecycle Hooks---#######//
  componentDidMount() {
    this.findReviews();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product_id !== this.props.product_id) {
      this.props.requestProductReviews();
    }
  }

  //########---Review-List Builders---#######//
  findReviews() {
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

  render() {
    let reviews = this.props.reviews;
    let characteristics = this.props.characteristics;

    if (reviews.length > 0) {
      var reviewList = [];

      var listLength = (this.props.reviews.length <= this.state.reviewLimit) ? this.props.reviews.length : this.state.reviewLimit;

      for (var i = 0; i < listLength; i++) {
        let review = reviews[i];
        if (this.props.starFilters.length > 0) {
          if (this.props.starFilters.includes(review.rating)) {
            reviewList.push(
              <ReviewTile key={review.review_id} review={review} submitHelpfulOrReport={this.props.submitHelpfulOrReport} handleThumbnailClick={this.handleThumbnailClick} toggleImageModalVisiblity={this.toggleImageModalVisiblity} />
            );
          } else {
            if (reviews[i + 1]) {
              listLength ++;
            }
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

    var moreReviewsButton =
      this.state.reviewLimit <= this.props.reviews.length ?
        <button type="button" id="more-reviews" className="ratings-button" onClick={this.handleMoreReviewsClick}>More Reviews</button>
        :
        <></>;

    if (this.state.imageModalVisible) {
      var imageModal = <ImageModal key={this.state.thumbnail} thumbnailURL={this.state.thumbnailURL} toggleImageModalVisibility={this.toggleImageModalVisiblity} />;
    } else {
      var imageModal = <></>;
    }

    return (
      <>
        <div className="review-list">

          {reviewList}

          {imageModal}

          {moreReviewsButton}

          <button type="button" id="add-review" onClick={this.toggleAddReviewFormVisibility} className='ratings-button'>Add A Review  +</button>

          {this.state.addReviewFormVisible && <AddReviewForm characteristics={characteristics} product_name={this.props.product_name} toggleAddReviewFormVisibility={this.toggleAddReviewFormVisibility} submitReviewForm={this.props.submitReviewForm} product_id={this.props.product_id} handleClick={this.props.handleClick}/>}

        </div>
      </>
    );
  }
}

export default ReviewList;