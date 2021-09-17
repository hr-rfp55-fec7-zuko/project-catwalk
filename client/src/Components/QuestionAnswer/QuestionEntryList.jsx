import React from 'react';
import AnswerEntryList from './AnswerEntryList.jsx';
import QuestionCountList from './QuestionCountList.jsx';
import QuestionReportList from './QuestionReportList.jsx';
import AddAnswerList from './AddAnswerList.jsx';
import AddQuestionList from './AddQuestionList.jsx';

class QuestionEntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayQuestion: 2};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({displayQuestion: this.props.lists.length});
  }

  render() {
    var list = this.props.lists.map(list => {
      return (
        <div className="qa-eachQ">
          <p className="qa-questions">{'Q: ' + list.question_body}</p>
          <QuestionCountList helpfulness={list.question_helpfulness} questionId={list.question_id}/>
          <QuestionReportList questionId={list.question_id}/>
          <AddAnswerList questionId={list.question_id} questionBody={list.question_body} pName={this.props.prodName}/>
          <div className="break"></div>
          <AnswerEntryList questionId={list.question_id}/>
        </div>
      );
    });

    return (
      <div className="qa-list">
        <div className="qa-mainlist">
          {list.slice(0, this.state.displayQuestion)}
        </div>
        <br />
        <div className="qa-twoButtons">
          {(this.state.displayQuestion < this.props.lists.length) &&
            <button className="qa-button" onClick={this.handleClick}>
              MORE ANSWERED QUESTIONS
            </button>
          }
          <AddQuestionList pName={this.props.prodName} pId={this.props.prodId}/>
        </div>
        {/* <button className="qa-button">
          ADD A QUESTION +
        </button> */}
      </div>
    );
  }
}

export default QuestionEntryList;
