import React from 'react';
import SortBar from './SortBar/SortBar.jsx';
import ReviewList from './ReviewList/ReviewList.jsx';
import RatingBreakdown from './LeftSideBar/RatingBreakdown/RatingBreakdown.jsx';
import ProductBreakdown from './LeftSideBar/ProductBreakdown/ProductBreakdown.jsx';
import helpers from './helpers/helpers.js';
import { determineTotalReviews, filterReviewEntries } from './helpers/helpers.js';
import axios from 'axios';
import withClickTracked from '../../ClickTracker.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'product_id': this.props.product_id,
      metaData: {
        'product_id': '00000',
        ratings: {},
        recommended: {
          true: 0,
          false: 0
        },
        characteristics: {}
      },
      reviews: [],
      starFilters: [],
      clearFilterVisible: false,
      reviewCount: 500,
    };

    this.requestProductMetaData = this.requestProductMetaData.bind(this);
    this.requestProductReviews = this.requestProductReviews.bind(this);
    this.submitReviewForm = this.submitReviewForm.bind(this);
    this.submitHelpfulOrReport = this.submitHelpfulOrReport.bind(this);
    this.toggleStarRatingFilter = this.toggleStarRatingFilter.bind(this);
    this.handleClearStarFilters = this.handleClearStarFilters.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.requestProductMetaData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product_id !== this.props.product_id) {
      this.requestProductMetaData();
    }
  }

  //########---EVENT HANDLERS---#######//
  toggleStarRatingFilter(event) {
    const filterValue = parseInt(event.target.className.replace( /^\D+/g, ''));
    const currentStarFiltersState = this.state.starFilters;
    const updatedStarFiltersState = filterReviewEntries(filterValue, currentStarFiltersState);

    this.setState(updatedStarFiltersState);
  }

  handleClearStarFilters() {
    this.setState({starFilters: [], clearFilterVisible: false});
  }

  handleSortChange(event) {
    let filter = event.target.value;
    this.requestProductReviews(filter);
    this.handleClearStarFilters();
  }

  //########---AJAX REQUESTS---#######//
  handleClick(target) {
    this.props.clickTrack(target, 'ratings-and-reviews', Date().toLocaleString());
  }

  requestProductMetaData() {
    return axios({
      url: `/reviews/meta?product_id=${this.props.product_id}`,
      method: 'GET'
    })
      .then((results) => this.setState({metaData: results.data}))
      .catch((error) => console.error('ERROR in METADATA AJAX Request: ', error));
  }

  requestProductReviews(filter, pageCount) {
    return axios({
      url: `/reviews/?product_id=${this.props.product_id}&count=${this.state.reviewCount}&sort=${filter}`,
      method: 'GET'
    })
      .then((results) => this.setState({reviews: results.data.results, reviewCount: this.state.reviewCount + 100}))
      .catch((error) => console.error('ERROR in REVIEWS AJAX Request: ', error));
  }

  submitReviewForm(body) {
    return axios.post('/reviews/', {params: body})
      .then((results) => console.log('AJAX POST RESULTS:', results.data, results))
      .catch((error) => console.error('error', error));
  }

  submitHelpfulOrReport(reviewId, action) {
    return axios({
      url: `/reviews/${reviewId}/${action}`,
      method: 'PUT'
    })
      .then((results) => {
        this.requestProductReviews();
      })
      .catch((error) => console.error('ERROR in SUBMITHELPFULORREPORT AJAX Request: ', error));
  }


  render() {
    let reviewCount = determineTotalReviews(this.state.metaData.ratings);

    return (

      <div className="ratings-and-reviews" id="ratings-and-reviews">

        <>
          <RatingBreakdown metaData={this.state.metaData} reviewCount={reviewCount} setAvgRating={this.setAvgRating} starFilters={this.state.starFilters} toggleStarRatingFilter={this.toggleStarRatingFilter} handleClearStarFilters={this.handleClearStarFilters} clearFilterVisible={this.state.clearFilterVisible}/>
          <ProductBreakdown characteristics={this.state.metaData.characteristics}/>
          <SortBar reviewCount={reviewCount} requestProductReviews={this.requestProductReviews} reviewListCount={this.state.reviews.length} handleSortChange={this.handleSortChange}/>
          <ReviewList reviews={this.state.reviews} characteristics={this.state.metaData.characteristics} requestProductReviews={this.requestProductReviews} reviewCount={reviewCount} submitHelpfulOrReport={this.submitHelpfulOrReport} product_name={this.props.product_name} submitReviewForm={this.submitReviewForm} product_id={this.props.product_id} starFilters={this.state.starFilters} handleClick={this.handleClick}/>
        </>
      </div>
    );
  }
}


export default withClickTracked(RatingsAndReviews);