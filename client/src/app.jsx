import React from 'react';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';

import RatingsAndReviews from './Components/RatingsAndReviews/RatingsAndReviews.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        Hello from React! This is a test for merge conflict from Iris.
        <ProductOverview />
        <RatingsAndReviews />
      </div>
    );
  }
}

export default App;