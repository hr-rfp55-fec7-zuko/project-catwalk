import React from 'react';
import ReactDOM from 'react-dom';

import ProductOverview from './Components/ProductOverview/ProductOverview.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        Hello from React!
        <ProductOverview />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));