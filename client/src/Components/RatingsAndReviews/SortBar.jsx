import React from 'react';

class SortBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "relevant"
    }

    this.setParentStateFilter = this.setParentStateFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }



  setParentStateFilter(event){
    this.props.requestProductReviews(this.state.filter)
  }

  handleFilterChange(){
    let filter = event.target.value;
    console.log(filter)
    this.props.requestProductReviews(filter)

  }

  render() {
    let reviewCount = this.props.reviewCount;
    return (
      <div className="sort-bar">
        <form id="sort-bar">
        <span>{this.props.reviewCount} reviews, sorted by</span>
          <select name="sort-type" id="sort-type" onChange={this.handleFilterChange}>
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