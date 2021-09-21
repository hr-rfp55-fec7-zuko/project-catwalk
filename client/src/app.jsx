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
      'product_id': '40446',
      'product_name': 'Camo Onesie',
      avgRating: null,
      totalReviews: null
    };
    this.updateProductID = this.updateProductID.bind(this);
    this.updateProductName = this.updateProductName.bind(this);
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
      .then((ratingsObj) => {
        this.setState({
          totalReviews: helpers.determineTotalReviews(ratingsObj),
          avgRating: helpers.determineAverageRating(ratingsObj)
        });
      })
      .catch((error) => console.error(error));
  }

  updateProductID(productID) {

    this.setState({
      'product_id': productID,
    });
  }

  updateProductName(productName) {
    this.setState({
      'product_name': productName
    });
  }

  render() {
    return (
      <div>
        <div className='top-bar'>
          <br />
          <h1 className='app-title'>
            <i className='fas fa-dragon'></i> Fire Nation Fashion
          </h1>
          <h4 className='sale-info'><i className="fas fa-fire"></i> Check out our flaming hot sales! <i className="fas fa-fire"></i> <br /><br /></h4>

        </div>
        <ProductOverview productId={this.state.product_id} avgRating={this.state.avgRating} totalReviews={this.state.totalReviews} updateProductName={this.updateProductName} />
        <br /><br />
        <RelatedProductsView productId={this.state.product_id} updateProductID={this.updateProductID} />
        <YourOutfitList productId={this.state.product_id} />
        <QuestionAnswer productId={this.state.product_id} productName={this.state.product_name} />
        <br /><br />
        <RatingsAndReviews product_id={this.state.product_id} product_name={this.state.product_name} />
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
