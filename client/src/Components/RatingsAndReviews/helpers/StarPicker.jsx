import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ratingMeanings from './ratingMeanings.js';

class StarPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionLabel: null
    };

    this.handleStarSelect = this.handleStarSelect.bind(this);
  }

  handleStarSelect(event) {
    let button = event.target.parentElement.parentElement;
    let name = button.name;
    let id = button.id;

    this.setState({selectionLabel: ratingMeanings.starValues[id]});

    this.props.handleStarSelect(name, id);
  }

  render() {
    return (
      <div className="star-picker">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <>
              <button type="button" onClick={this.handleStarSelect} id={ratingValue} name="rating">
                <FontAwesomeIcon onClick={this.handleRadioFormChange} key={ratingValue} className="star" value={ratingValue} icon={faStar} size={'2x'} color={ratingValue <= this.props.rating ? '#ff0707' : '#e4e5e9'}/>
              </button>
            </>
          );
        })
        }
        {this.state.selectionLabel ? this.state.selectionLabel : <></>}
      </div>
    );
  }
}

export default StarPicker;

