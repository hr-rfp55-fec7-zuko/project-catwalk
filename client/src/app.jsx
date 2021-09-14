import React from 'react';
import 'regenerator-runtime/runtime';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import RelatedProductsView from './Components/RelatedProducts/RelatedProductsView.jsx';
import YourOutfitList from './Components/YourOutfitList/YourOutfitList.jsx';



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
        <ProductOverview />
        <RelatedProductsView />
        <YourOutfitList />
      </div>
    );
  }
}

export default App;