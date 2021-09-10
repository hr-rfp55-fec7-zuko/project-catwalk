import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
       Hello from React! This is a test for merge conflict from Iris.
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));