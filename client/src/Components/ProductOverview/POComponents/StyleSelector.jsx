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
        <b>Style `&gt;`</b> {this.state.styleName}
        <br/>
        {this.state.styles.map((style) => <img className='style-img' src={style.photos[0].thumbnail_url} onClick={(event) => {
          event.preventDefault();
          console.log('clicked');
          this.props.setStyleSelection(style);
          this.setState({styleName: style.name});
        }} />)}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.styles !== prevProps.styles) {
      this.setState({ styles: this.props.styles });
      for (var i = 0; i < this.props.styles.length; i++) {
        // console.log('going into for loop');
        if (this.props.styles[i]['default?']) {
          this.setState({ styleName: this.props.styles[i].name });
          this.props.setStyleSelection(this.props.styles[i]);
          break;
        }
      }
    }
  }
}

export default StyleSelector;