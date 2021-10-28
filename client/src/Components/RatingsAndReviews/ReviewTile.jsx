import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AvgRatingStars from './helpers/AvgRatingStars.jsx';


class ReviewTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helpfulOrReported: false
    };

    this.handleHelpfulOrReportClick = this.handleHelpfulOrReportClick.bind(this);
    this.handleThumbnailClick = this.handleThumbnailClick.bind(this);
  }

  handleHelpfulOrReportClick(event) {
    event.preventDefault();
    let action = event.target.textContent;


    if (!this.state.helpfulOrReported) {
      if (action === 'Yes') {
        action = 'helpful';
      }
      this.setState({helpfulOrReported: true});
      this.props.submitHelpfulOrReport(this.props.review.review_id, action);
    }
  }

  handleThumbnailClick() {
    this.props.handleThumbnailClick(event.target.src);
  }

  render() {
    let review = this.props.review;
    let date = moment(review.date).format('LL');

    if (review.photos.length > 0) {
      var photos = review.photos.map((photo) => {
        return (
          <img src={photo.url} id={photo.id} width='20' height ='20' aria-label="customer's product"></img>
        );
      });
    } else {
      var photos = <></>;
    }


    return (
      <div className="review-tile">
        <div className="star-rating">
          <AvgRatingStars avgRating={review.rating} />
        </div>

        <div className="review-attribution">
          {review.reviewer_name}, {date}
        </div>

        <div className="review-summary">{review.summary}</div>
        <div className="review-body">{review.body}</div>

        <div className="review-thumbnails">
          {review.photos.length > 0 &&
          review.photos.map((photo) => <img src={photo.url} id={photo.id} className='review-thumbnail' onClick={this.handleThumbnailClick}/>)
          }
        </div>

        {review.recommend &&
          <div className="review-recommend">
            <FontAwesomeIcon icon={faCheck}/> I recommend this product</div>
        }

        {review.response &&
          <div className="review-response"><h3>Response</h3>{review.response}</div>
        }

        <div className="helpful-or-report">Helpful?
          <span className="helpful">
            <a href="" onClick={this.handleHelpfulOrReportClick} className='helpful-count'>
            Yes
            </a>
            ({review.helpfulness}) |
          </span>

          <span className="report">
            <a href="" onClick={this.handleHelpfulOrReportClick}>
            Report
            </a>
          </span>

          {this.state.helpfulOrReported &&
          <><br/><span>Your feedback has been submitted</span></>
          }
        </div>
      </div>
    );
  }
}

export default ReviewTile;