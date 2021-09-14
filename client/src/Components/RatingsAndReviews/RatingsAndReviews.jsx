import React from 'react';
import SortBar from './SortBar.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import helpers from './helpers/helpers.js';
import $ from 'jquery';
import axios from 'axios';


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

    // const initialDataLoad = function() {
    //   return new Promise((resolve, reject) => {
    //     this.requestProductMetaData((error, data) => {

    //       if (error) {
    //         reject(error);
    //       } else {
    //         resolve(data);
    //       }

    //     });

    //   });
    // }
    //   .then((data) => console.log('made it to the next step!'));
  }

  requestProductMetaData() {
    return axios({
      url: `/reviews/meta?product_id=${this.state.product_id}`,
      method: 'GET'
    })
      .then((results) => this.setState({metaData: results.data}))
      .catch((error) => console.log('ERROR in METADATA AJAX Request: ', erro));

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
  submitReviewForm() {

  }

  render() {

    let reviewCount = helpers.determineTotalReviews(this.state.metaData.ratings);

    return (
      <div className="ratings-and-reviews">
        <h2>Ratings and Reviews</h2>
        {this.state.reviews !== null &&
         <>
           <SortBar reviewCount={reviewCount}/>
           <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics} requestProductReviews={this.requestProductReviews} reviewCount={reviewCount}/>
           <RatingBreakdown metaData={this.state.metaData} reviewCount={reviewCount}/>
           <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
         </>
        }
      </div>
    );
  }
}


export default RatingsAndReviews;