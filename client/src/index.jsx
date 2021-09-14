import React from 'react';
import ReactDOM from 'react-dom';



import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';

import QuestionAnswer from './Components/QuestionAnswer/QuestionAnswer.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        Hello from React! This is a test for merge conflict from Iris.
        <ProductOverview />

        <QuestionAnswer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));