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

  // componentDidUpdate() {
  //   this.updateQuestionsList();
  // }

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
        <h4>QUESTIONS & ANSWERS</h4>
        <input type="text" className="qa-searchBar" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." />
        <QuestionEntryList lists={this.state.questionsList}/>
      </div>
    );
  }
}

export default QuestionAnswer;

//TODO: Add a magnifying glass in searchBar
