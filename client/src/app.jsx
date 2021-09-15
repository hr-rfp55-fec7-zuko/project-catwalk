import React from 'react';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import QuestionAnswer from './Components/QuestionAnswer/QuestionAnswer.jsx';
import RelatedProductsView from './Components/RelatedProducts/RelatedProductsView.jsx';
import YourOutfitList from './Components/YourOutfitList/YourOutfitList.jsx';

import RatingsAndReviews from './Components/RatingsAndReviews/RatingsAndReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'product_id': '40344'
    };
  }
  render() {
    return (
      <div>
        Hello from React! This is a test for merge conflict from Iris.
        {/* <ProductOverview productId={this.state.product_id} /> */}
        {/* <QuestionAnswer productId={this.state.product_id} /> */}
        {/* <RelatedProductsView productId={this.state.product_id} /> */}
        {/* <YourOutfitList productId={this.state.product_id}/> */}
        <RatingsAndReviews product_id={this.state.product_id} />
      </div>
    );
  }
}

export default App;
