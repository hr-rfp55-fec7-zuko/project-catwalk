import React from 'react';

class SortBar extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    let reviewCount = this.props.reviewCount;
    return (
      <div className="sort-bar">
        <form id="sort-bar">
          <span>{this.props.reviewCount} reviews, sorted by</span>
          <select name="sort-type" id="sort-type">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </form>
      </div>
    );
  }
}

export default SortBar;