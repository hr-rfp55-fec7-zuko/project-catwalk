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
      metaData: exampleMetaData, /*When requesting from API, should be null to start*/
      reviews: exampleReviews, /*When requesting from API, should be null to start*/
      receivedData: false
    };

    this.requestProductMetaData = this.requestProductMetaData.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
    this.submitReviewForm = this.submitReviewForm.bind(this);
  }

  componentDidMount() {

    this.requestProductMetaData();
    this.requestProductReviews();
    this.setState({receivedData: true});


  }

  requestProductMetaData() {
    $.ajax({
      url: `/reviews/meta?product_id=${this.state.product_id}`,
      method: 'GET',
      success: (data) => console.log('successful meta:', data),
      error: (error) => console.log('ERROR in METADATA AJAX Request: ', error)

      // this.setState({metaData: data})
    });

    // this.setState({metaData: data})
  }

  requestProductReviews() {
    $.ajax({
      url: `/reviews/?product_id=${this.state.product_id}`,
      method: 'GET',
      success: (data) => console.log('success product:', data),
      error: (error) => console.log('ERROR in METADATA AJAX Request: ', error)
    });

    //this.setState({revies: data})
  }

  //submit review form
  submitReviewForm() {

  }

  //utility
  sendAjaxRequest() {

  }



  render() {

    // if () {
    //   var modules =
    //   <>
    //     <SortBar reviewCount={this.state.reviews.count}/>
    //     <ReviewList reviews={this.state.reviews} characteristics=
    //       {this.state.metaData.characteristics}/>
    //     <RatingBreakdown metaData={this.state.metaData} reviewCount={this.state.reviews.count}/>
    //     <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
    //   </>;
    // } else {
    //   var modules = <></>;
    // }






    return (
      <div className="ratings-and-reviews">
        <h2>Ratings and Reviews</h2>
        {this.state.receivedData === true &&
         <>
           <SortBar reviewCount={this.state.reviews.count}/>
           <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics}/>
           <RatingBreakdown metaData={this.state.metaData} reviewCount={this.state.reviews.count}/>
           <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
         </>
        }
      </div>
    );
  }
}


export default RatingsAndReviews;