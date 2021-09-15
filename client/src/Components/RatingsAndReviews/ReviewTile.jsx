import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let review = this.props.review;
    return (
      <div className="review-tile">
        <div>{review.rating}</div>
        <div>{review.date}</div>
        <div>{review.summary}</div>
        <div>{review.body}</div>
        <div>{review.recommend}</div>
        <div>{review.reviewer_name}</div>
        <div>Placeholder: Response to review?</div>
        <div>Was this review helpful?</div>
        <div>Yes ({review.helpfulness})</div>
        <div>No - Where is this info stored?</div>
      </div>
    );
  }
}

export default ReviewTile;