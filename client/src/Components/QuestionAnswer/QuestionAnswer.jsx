import React from 'react';
import QuestionEntryList from './QuestionEntryList.jsx';
import $ from 'jquery';


class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {questionsList: [], originList: []};
    this.updateQuestionsList = this.updateQuestionsList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.updateQuestionsList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.updateQuestionsList();
    }
  }

  handleChange(e) {
    e.preventDefault();
    var filteredList = [];
    if (e.target.value.length >= 3) {
      for (var i = 0; i < this.state.questionsList.length; i++) {
        if (this.state.questionsList[i].question_body.toLowerCase().includes(e.target.value)) {
          filteredList.push(this.state.questionsList[i]);
        }
      }
      this.setState({questionsList: filteredList});
    } else {
      this.setState({questionsList: this.state.originList});
    }
  }

  updateQuestionsList() {
    $.ajax({
      type: 'GET',
      url: '/qa/questions',
      data: {'product_id': this.props.productId, page: 1, count: 100},
      error: (err) => {
        console.log('Client GET Err:', err);
      },
      success: (data) => {
        this.setState({questionsList: data, originList: data});
      }
    });
  }

  render() {
    return (
      <div className="qa-main">
        <h3>QUESTIONS & ANSWERS</h3>
        <div className="input-icon">
          <input type="text" className="qa-searchBar" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={this.handleChange}/>
        </div>
        <QuestionEntryList lists={this.state.questionsList} prodName={this.props.productName} prodId={this.props.productId} updateQuestionList={this.updateQuestionsList}/>
      </div>
    );
  }
}

export default QuestionAnswer;
