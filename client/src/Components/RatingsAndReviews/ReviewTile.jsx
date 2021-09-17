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
  }

  handleHelpfulOrReportClick(event) {
    event.preventDefault();
    let action = event.target.textContent;


    if (!this.state.helpfulOrReported) {

      if (action === 'Yes') {
        action = 'helpful';
      }

      console.log('action - handleHelpfulOrReportClick', action);

      this.setState({helpfulOrReported: true});

      console.log(this.props.review.review_id, action);

      this.props.submitHelpfulOrReport(this.props.review.review_id, action);

    }
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
            <span className="review-user">{review.reviewer_name}, </span>
            <span className="review-date">{date}</span>
        </div>

        <div className="review-summary">{review.summary}</div>
        <div className="review-body">{review.body}</div>


        <div className="review-thumbnails">
        {review.photos.length > 0 &&
          review.photos.map((photo) => <img src={photo.url} id={photo.id} height="20" width="20" className="review-thumbnail"/>)
        }
        </div>

        {review.recommend &&
          <div className="review-recommend">
            <FontAwesomeIcon icon={faCheck}/> I recommend this product</div>
        }

        {/* {photos} */}


        {review.response &&
          <div className="review-response">Response<br></br>{review.response}</div>
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
          <span>Your feedback has been submitted</span>
          }

        </div>


      </div>
    );
  }
}

export default ReviewTile;