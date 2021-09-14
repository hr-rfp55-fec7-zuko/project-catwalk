import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: this.props.styles,
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

  componentDidMount() {
    console.log('running componentDidMount when', this.state.styles );
    this.setState({styles: this.props.styles});
    console.log(this.props.styles.length);
    for (var i = 0; i < this.props.styles.length; i++) {
      console.log('going into for loop');
      if (styles[i]['default?']) {
        this.setState({styleName: styles[i].name});
        this.props.setStyleSelection(styles[i]);
      }
    }
  }
}

export default StyleSelector;