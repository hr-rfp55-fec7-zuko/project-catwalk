import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleName: ''
    };
  }

  render() {
    return (
      <div id='po-style-select'>
        Style Selected: {this.state.styleName}
      </div>
    );
  }
}

export default StyleSelector;