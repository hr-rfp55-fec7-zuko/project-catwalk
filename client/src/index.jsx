import React from 'react';
import ReactDOM from 'react-dom';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import RelatedItems from './Components/RelatedItems/RelatedItems.jsx';


class App extends React.Component {
  render() {
    return (
      <div>
        Hello from React! This is a test for merge conflict from Iris.
        <ProductOverview />
        <RelatedItems />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));