import React from 'react';
import SortBar from './SortBar.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import $ from 'jquery';


//****PLACEHOLDER DATA - DELETE DURING CLEANUP */
import exampleMetaData from './exampleData/exampleMetaData.js';
import exampleReviews from './exampleData/exampleReviews.js';
const exampleProductId = 40344;

/*DATA FLOW NOTES*/
//Receives product_id from App
//Requests all reviews for provided product id. Stores in state.
//SortBar and ReviewList receive App.state.productReviews
//Product Breakdown and ratingBreakdown receive product id
class RatingsAndReviews extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'product_id': this.props.product_id,
      reviewLimit: 2,
      metaData: exampleMetaData,
      reviews: exampleReviews,
      receivedInitialData: false
    };

    this.requestProductMetaData = this.requestProductMetaData.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
    this.submitReviewForm = this.submitReviewForm.bind(this);
  }

  componentDidMount() {
    this.requestProductMetaData();
    this.requestProductReviews();
    /*
    const loadProductMetaData = function() {
    return new Promise((resolve, reject) => {
      this.requestProductMetaData();
      this.requestProductReviews();
    });
    loadProductMetaData
      .then(() => this.setState({receivedInitialData: true}))
      .catch((error) => console.log('requestError', error));
      */
  }

  requestProductMetaData() {
    $.ajax({
      url: `/reviews/meta?product_id=${this.state.product_id}`,
      method: 'GET',
      success: (data) => this.setState({metaData: data}),
      error: (error) => console.log('ERROR in METADATA AJAX Request: ', error)
    });
  }

  requestProductReviews() {
    console.log('this.state.reviewLimit', this.state.reviewLimit);
    $.ajax({
      url: `/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewLimit}`,
      method: 'GET',
      success: (data) => this.setState({reviews: data, reviewLimit: this.state.reviewLimit + 2}),
      error: (error) => console.log('ERROR in METADATA AJAX Request: ', error)
    });
    //Reset limit in callback state. confirm this works
  }

  //submit review form
  submitReviewForm() {

  }

  render() {
    return (
      <div className="ratings-and-reviews">
        <h2>Ratings and Reviews</h2>
        {this.state.reviews !== null &&
         <>
           <SortBar reviewCount={this.state.reviews.count}/>
           <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics} requestProductReviews={this.requestProductReviews}/>
           <RatingBreakdown metaData={this.state.metaData} reviewCount={this.state.reviews.count}/>
           <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
         </>
        }
      </div>
    );
  }
}


export default RatingsAndReviews;