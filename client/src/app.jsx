import React from 'react';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import QuestionAnswer from './Components/QuestionAnswer/QuestionAnswer.jsx';
import RelatedProductsView from './Components/RelatedProducts/RelatedProductsView.jsx';
import YourOutfitList from './Components/YourOutfitList/YourOutfitList.jsx';
import RatingsAndReviews from './Components/RatingsAndReviews/RatingsAndReviews.jsx';

import axios from 'axios';

import helpers from './Components/RatingsAndReviews/helpers/helpers.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'product_id': '40355',
      'product_name': 'Camo Onesie',
      avgRating: null
    };
  }

  componentDidMount() {
    this.requestProductMetaData();
  }

  requestProductMetaData() {
    return axios({
      url: `/reviews/meta?product_id=${this.state.product_id}`,
      method: 'GET'
    })
      .then((results) => results.data.ratings)
      .then((ratingsObj) => helpers.determineAverageRating(ratingsObj))
      .then((avgRating) => this.setState({avgRating: avgRating}))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <ProductOverview productId={this.state.product_id} avgRating={this.state.avgRating} />
        <QuestionAnswer productId={this.state.product_id} productName={this.state.product_name} />
        <RelatedProductsView productId={this.state.product_id} />
        <YourOutfitList productId={this.state.product_id}/>
        <RatingsAndReviews product_id={this.state.product_id} product_name={this.state.product_name}/>
      </div>
    );
  }
}

export default App;


/*
NOTE ON STAR COMPONENTS:

This is how component should appear in modle components.
<AvgRatingStars avgRating={this.props.avgRating} />

Path to component file for import:
/Components/RatingsAndReviews/helpers/AvgRatingStars.jsx

'avgRating' prop is required and can be passed down from app state.
<ModuleName product_id={this.state.product_id} avgRating={this.state.avgRating}/>

*/
