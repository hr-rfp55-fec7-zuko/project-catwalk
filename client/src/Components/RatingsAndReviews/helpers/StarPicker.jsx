import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar  } from '@fortawesome/free-solid-svg-icons';

class StarPicker extends React.Component{
  constructor(props) {
    super(props)

    this.handleStarSelect = this.handleStarSelect.bind(this);
  }

  handleStarSelect(event) {
    let button = event.target.parentElement.parentElement
    let name = button.name;
    let id = button.id;

    this.props.handleStarSelect(name, id)
  }

  render() {
    return (
      <div className="star-picker">
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <>
                <button type="button" onClick={this.handleStarSelect} id={ratingValue} name="rating">
                  <FontAwesomeIcon onClick={this.handleRadioFormChange} key={ratingValue} className="star" value={ratingValue} icon={faStar} size={'2x'} color={ratingValue <= this.props.rating ? '#ffc107' : '#e4e5e9'}/>
                </button>
              </>
            )
          })
        }
      </div>
    )
  }
}



export default StarPicker

