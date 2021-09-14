import React from 'react';
import 'regenerator-runtime/runtime';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import QuestionAnswer from './Components/QuestionAnswer/QuestionAnswer.jsx';

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
        {/* <ProductOverview productId={this.state.product_id} /> */}
        {/* <QuestionAnswer productId={this.state.product_id} /> */}
        <RatingsAndReviews product_id={this.state.product_id} />
      </div>
    );
  }
}

export default App;