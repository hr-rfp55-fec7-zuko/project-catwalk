import React from 'react';

class SortBar extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    let reviewCount = this.props.reviewCount;
    return (
      <div className="sort-bar">
        <div>{this.props.reviewCount} reviews, sorted by
        <form id="sort-bar">
          <select name="sort-type" id="sort-type">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </form>
        </div>
      </div>
    );
  }
}

export default SortBar;