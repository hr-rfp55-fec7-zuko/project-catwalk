import React from 'react';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';
import QuestionAnswer from './Components/QuestionAnswer/QuestionAnswer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <ProductOverview />
        <QuestionAnswer />
      </div>
    );
  }
}

export default App;