import React from 'react';
import SortBar from './SortBar.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import helpers from './helpers/helpers.js';
import axios from 'axios';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //   'product_id': this.props.product_id,
         'product_id': 40435, //40347 - photos, 40435-response, 40453 - long review with pics
      metaData: {
        product_id: '00000',
        ratings: {},
        recommended: {
          true: 0,
          false: 0
        },
        characteristics:{}
      },
      reviews: [],
      starFilters: [],
      clearFilterVisible: false,
      reviewCount: 100
    };

    this.requestProductMetaData = this.requestProductMetaData.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
    this.submitReviewForm = this.submitReviewForm.bind(this);
    this.submitHelpfulOrReport = this.submitHelpfulOrReport.bind(this);
    this.toggleStarRatingFilter = this.toggleStarRatingFilter.bind(this);
    this.handleClearStarFilters = this.handleClearStarFilters.bind(this);
  }

  componentDidMount() {
    this.requestProductMetaData();
  }

  //########---EVENT HANDLERS---#######//
  toggleStarRatingFilter(event){
    var filterValue = event.target.className.replace( /^\D+/g, '')
    var indexOfFilterValue = this.state.starFilters.indexOf(filterValue)
    var newFilterList;
    var clearFilterVisibility;

    if (indexOfFilterValue === 0 && this.state.starFilters.length === 1) {
      newFilterList = [];
      clearFilterVisibility = false;
    } else if (indexOfFilterValue !== -1) {
      let stateCopy = this.state.starFilters.slice()
      newFilterList = stateCopy.splice((indexOfFilterValue -1 || 0), 1);
      clearFilterVisibility = true;
    } else if (this.state.starFilters.length === 0) {
      newFilterList = [filterValue];
      clearFilterVisibility = true;
    } else {
      newFilterList = this.state.starFilters.slice();
      newFilterList.push(filterValue);
      clearFilterVisibility = true;
    }

    this.setState({starFilters: newFilterList, clearFilterVisible: clearFilterVisibility});
  }

  handleClearStarFilters(){
    this.setState({starFilters: []})
  }

  //########---AJAX REQUESTS---#######//
  requestProductMetaData() {
    return axios({
      url: `/reviews/meta?product_id=${this.state.product_id}`,
      method: 'GET'
    })
      .then((results) => this.setState({metaData: results.data}))
      .catch((error) => console.log('ERROR in METADATA AJAX Request: ', error));
  }

  //eventually this should take a page and count number
  requestProductReviews(filter, pageCount) {
    return axios({
      url: `/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewCount}&sort=${filter}`,
      method: 'GET'
    })
      .then((results) => this.setState({reviews: results.data.results, reviewCount: this.state.reviewCount + 100}))
      .catch((error) => console.log('ERROR in REVIEWS AJAX Request: ', error));
  }

  //submit review form
  submitReviewForm(body) {
    return axios.post('/reviews/', {params: body})
    // .then((results) => console.log('AJAX POST RESULTS:', results))
    .catch((error) => console.log('error', error))
  }

  submitHelpfulOrReport(reviewId, action) {
    return axios({
      url: `/reviews/${reviewId}/${action}`,
      method: 'PUT'
    })
      .then((results) => {
        // console.log('Successful PUT request. Results?', results);
        this.requestProductReviews();
      })
      .catch((error) => console.log('ERROR in SUBMITHELPFULORREPORT AJAX Request: ', error));
  }


  render() {

    let reviewCount = helpers.determineTotalReviews(this.state.metaData.ratings);

    return (
      <div className="ratings-and-reviews" id="ratings-and-reviews">


        {this.state.reviews !== null &&
         <>
           <RatingBreakdown metaData={this.state.metaData} reviewCount={reviewCount} setAvgRating={this.setAvgRating} toggleStarRatingFilter={this.toggleStarRatingFilter}handleClearStarFilters={this.handleClearStarFilters} clearFilterVisible={this.state.clearFilterVisible}/>
           <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
           <SortBar reviewCount={reviewCount} requestProductReviews={this.requestProductReviews}/>
           <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics} requestProductReviews={this.requestProductReviews} reviewCount={reviewCount} submitHelpfulOrReport={this.submitHelpfulOrReport} product_name={this.props.product_name} submitReviewForm={this.submitReviewForm} product_id={this.props.product_id} starFilters={this.state.starFilters}/>

           {/* <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics} requestProductReviews={this.requestProductReviews} reviewCount={reviewCount} submitHelpfulOrReport={this.submitHelpfulOrReport} product_name={this.props.product_name} submitReviewForm={this.submitReviewForm} product_id={this.props.product_id}/> */}
         </>
        }

      </div>
    );
  }
}


export default RatingsAndReviews;