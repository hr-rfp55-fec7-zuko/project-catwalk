import React from 'react';
import SingleStyle from './SingleStyle.jsx';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: this.props.styles,
      styleName: '',
      styleID: null
    };
  }

  render() {
    return (
      <div id='po-style-select'>
        <b>Style &gt;</b> {this.state.styleName}
        <br />
        <div className='style-container'>
          {this.state.styles.map((style) =>
            <SingleStyle
              key={style.style_id}
              style={style}
              onClick={(event) => {
                event.preventDefault();
                this.props.setStyleSelection(style);
                this.setState({
                  styleName: style.name,
                  styleID: style.style_id
                });
              }}
              selected={style.style_id === this.state.styleID} />)}
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.styles !== prevProps.styles) {
      this.setState({ styles: this.props.styles });
      for (var i = 0; i < this.props.styles.length; i++) {
        // console.log('going into for loop');
        if (this.props.styles[i]['default?']) {
          this.setState({
            styleName: this.props.styles[i].name,
            styleID: this.props.styles[i].style_id
          });
          this.props.setStyleSelection(this.props.styles[i]);
          break;
        }
      }
    }
  }
}

export default StyleSelector;