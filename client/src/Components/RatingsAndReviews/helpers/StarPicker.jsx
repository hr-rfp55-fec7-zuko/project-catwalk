import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar  } from '@fortawesome/free-solid-svg-icons';
// import { faStar } from 'react-icons/fa'

//Should receive onClick function that tweaks state in the list instance

class StarPicker extends React.Component{
  constructor(props) {
    super(props)

    // this.handleRadioFormChange = this.handleRadioFormChange.bind(this);
  }

  render() {
    return (
      <div className="star-picker">
        {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <>
              <input type="radio" name="rating" onChange={this.props.handleRadioFormChange} id={ratingValue} name="rating"/>
              <label>
                <FontAwesomeIcon key={ratingValue} className="star" value={ratingValue} icon={faStar} size={'2x'} color={this.props.handleStarColorChange}/>
              </label>
              </>
            )
          })
        }
      </div>
    )
  }
}



export default StarPicker

