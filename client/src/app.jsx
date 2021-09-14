import React from 'react';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import RelatedProductsView from './Components/RelatedProducts/RelatedProductsView.jsx';
import YourOutfitList from './Components/YourOutfitList/YourOutfitList.jsx';



class App extends React.Component {
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