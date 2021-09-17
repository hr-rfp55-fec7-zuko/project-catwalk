import React from 'react';
import SortBar from './SortBar.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import helpers from './helpers/helpers.js';
import $ from 'jquery';
import axios from 'axios';


//****PLACEHOLDER DATA - DELETE DURING WHEN FINALIZED */
import exampleMetaData from './exampleData/exampleMetaData.js';
import exampleReviews from './exampleData/exampleReviews.js';

class RatingsAndReviews extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // 'product_id': this.props.product_id,
      'product_id': 40346, //DELETE THIS AND UNCOMMENT LINE ABOVE WHEN NOT TESTING SAMPLE DATA
      reviewLimit: 2,
      metaData: exampleMetaData,
      reviews: exampleReviews,
      receivedInitialData: false
    };


    this.requestProductMetaData = this.requestProductMetaData.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
    this.submitReviewForm = this.submitReviewForm.bind(this);
    this.submitHelpfulOrReport = this.submitHelpfulOrReport.bind(this);
  }

  componentDidMount() {
    this.requestProductMetaData();
    this.requestProductReviews();
  }

  requestProductMetaData() {
    return axios({
      url: `/reviews/meta?product_id=${this.state.product_id}`,
      method: 'GET'
    })
      .then((results) => this.setState({metaData: results.data}))
      .catch((error) => console.log('ERROR in METADATA AJAX Request: ', error));
  }

  requestProductReviews() {
    return axios({
      url: `/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewLimit}`,
      method: 'GET'
    })
      .then((results) => this.setState({reviews: results.data, reviewLimit: this.state.reviewLimit + 2}))
      .catch((error) => console.log('ERROR in REVIEWS AJAX Request: ', error));
  }

  //submit review form
  submitReviewForm(body) {
    console.log('requestreceivedinbody', body)

    //rembember to parse anything that's not a string
    return axios.post('/reviews/', {params: body})

    .then((results) => console.log('AJAX POST RESULTS:', results))


  }

  submitHelpfulOrReport(reviewId, action) {
    return axios({
      url: `/reviews/${reviewId}/${action}`,
      method: 'PUT'
    })
      .then((results) => {
        console.log('Successful PUT request. Results?', results);
        this.requestProductReviews();
      })
      .catch((error) => console.log('ERROR in SUBMITHELPFULORREPORT AJAX Request: ', error));
  }


  render() {

    let reviewCount = helpers.determineTotalReviews(this.state.metaData.ratings);

    return (
      <div className="ratings-and-reviews">
        <h2>Ratings and Reviews</h2>

        {this.state.reviews !== null &&
         <>
           <RatingBreakdown metaData={this.state.metaData} reviewCount={reviewCount} setAvgRating={this.setAvgRating}/>
           <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
           <SortBar reviewCount={reviewCount}/>
           <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics} requestProductReviews={this.requestProductReviews} reviewCount={reviewCount} submitHelpfulOrReport={this.submitHelpfulOrReport} product_name={this.props.product_name} submitReviewForm={this.submitReviewForm} product_id={this.props.product_id}/>
         </>
        }
      </div>
    );
  }
}


export default RatingsAndReviews;