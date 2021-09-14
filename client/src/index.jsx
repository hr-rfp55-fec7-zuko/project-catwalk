import React from 'react';
import ReactDOM from 'react-dom';

<<<<<<< HEAD
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
=======
import App from './app.jsx';
>>>>>>> f62e4f86617285f4da6453fd4933e5484bd1d782

ReactDOM.render(<App />, document.getElementById('app'));