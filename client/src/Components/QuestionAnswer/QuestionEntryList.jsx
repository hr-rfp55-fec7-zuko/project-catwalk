import React from 'react';
import AnswerEntryList from './AnswerEntryList.jsx';
import QuestionCountList from './QuestionCountList.jsx';
import QuestionReportList from './QuestionReportList.jsx';
import AddAnswerList from './AddAnswerList.jsx';
import AddQuestionList from './AddQuestionList.jsx';
import withClickTracked from '/client/src/ClickTracker.jsx';


class QuestionEntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {displayQuestion: 4, updateAnswer: true};
    this.handleClick = this.handleClick.bind(this);
    this.handleAnswerUpdate = this.handleAnswerUpdate.bind(this);
  }

  handleAnswerUpdate() {
    this.setState(prevState => ({
      updateAnswer: !prevState.updateAnswer
    }));
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({displayQuestion: this.props.lists.length});
    // console.log('selector:', e.target.className, 'section:', 'Questions and Answers', 'date:', Date().toLocaleString());
    this.props.clickTrack(e.target.className, 'Questions and Answers', Date().toLocaleString());
  }

  render() {
    if (this.props.lists) {
      var list = this.props.lists.map(list => {
        return (
          <div className="qa-eachQ" key={list.question_id}>
            <p className="qa-questions">{'Q: ' + list.question_body}</p>
            <div className="qa-questions-side">
              <QuestionCountList helpfulness={list.question_helpfulness} questionId={list.question_id}/>
              <QuestionReportList questionId={list.question_id}/>
              <AddAnswerList questionId={list.question_id} questionBody={list.question_body} pName={this.props.prodName} updateAnswer={this.handleAnswerUpdate}/>
            </div>
            <div className="break"></div>
            <AnswerEntryList questionId={list.question_id} status={this.state.updateAnswer}/>
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
            <AddQuestionList pName={this.props.prodName} pId={this.props.prodId} updateQuestion={this.props.updateQuestionList}/>
          </div>
        </div>
      );
    }
  }
}

export default withClickTracked(QuestionEntryList);
