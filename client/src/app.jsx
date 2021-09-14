import React from 'react';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
<<<<<<< HEAD
import RelatedProductsView from './Components/RelatedProducts/RelatedProductsView.jsx';
import YourOutfitList from './Components/YourOutfitList/YourOutfitList.jsx';


=======
import QuestionAnswer from './Components/QuestionAnswer/QuestionAnswer.jsx';
>>>>>>> f62e4f86617285f4da6453fd4933e5484bd1d782

class App extends React.Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        Hello from React! This is a test for merge conflict from Iris.
        <ProductOverview />
        <RelatedProductsView />
        <YourOutfitList />
=======
        <ProductOverview />
        <QuestionAnswer />
>>>>>>> f62e4f86617285f4da6453fd4933e5484bd1d782
      </div>
    );
  }
}

export default App;