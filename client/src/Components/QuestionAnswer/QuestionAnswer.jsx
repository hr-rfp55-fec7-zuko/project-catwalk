import React from 'react';
import QuestionEntryList from './QuestionEntryList.jsx';
import $ from 'jquery';


class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questionsList: []};
    this.updateQuestionsList = this.updateQuestionsList.bind(this);
  }

  componentDidMount() {
    this.updateQuestionsList();
  }

  updateQuestionsList() {
    $.ajax({
      type: 'GET',
      url: '/qa/questions',
      data: {'product_id': this.props.productId, page: 1, count: 4},
      error: (err) => {
        console.log('Client GET Err:', err);
      },
      success: (data) => {
        this.setState({questionsList: data});
      }
    });
  }

  render() {
    return (
      <div className="qa-main">
        <h3>QUESTIONS & ANSWERS</h3>
        <input type="text" className="qa-searchBar" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
        <QuestionEntryList lists={this.state.questionsList} prodName={this.props.productName} />
      </div>
    );
  }
}

export default QuestionAnswer;

//TODO: Add a magnifying glass in searchBar
