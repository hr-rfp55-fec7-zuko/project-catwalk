import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar  } from '@fortawesome/free-solid-svg-icons';
// import { faStar } from 'react-icons/fa'

//Should receive onClick function that tweaks state in the list instance

class StarPicker extends React.Component{
  constructor(props) {
    super(props)

    this.handleStarSelect = this.handleStarSelect.bind(this);
  }

  handleStarSelect(event) {
    // console.log(event.target.parentElement.parentElement)
    let button = event.target.parentElement.parentElement
    let id = button.id;
    let name = button.name;
    console.log(button, id, name)
    this.props.handleStarSelect(name, id)
  }

  render() {

    return (
      <div className="star-picker">
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <>
                {/* <input type="radio" name="rating" onChange={this.props.handleRadioFormChange} id={ratingValue} name="rating"/>
                <label> */}
                <button type="button" onClick={this.handleStarSelect} id={ratingValue} name="rating">
                  <FontAwesomeIcon onClick={this.handleRadioFormChange} key={ratingValue} className="star" value={ratingValue} icon={faStar} size={'2x'} color={ratingValue <= this.props.rating ? '#ffc107' : '#e4e5e9'}/>
                </button>
                {/* </label> */}
              </>
            )
          })
        }
      </div>
    )
  }
}



export default StarPicker

