import React from 'react';
import {AnswerEntryList, GetAnswerList} from './AnswerEntryList.jsx';
import QuestionCountList from './QuestionCountList.jsx';
import QuestionReportList from './QuestionReportList.jsx';
import AddAnswerList from './AddAnswerList.jsx';

class QuestionEntryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = this.props.lists.map(list => {
      return (
        <div>
          <p className="qa-questions">{'Q: ' + list.question_body}</p>
          <QuestionCountList helpfulness={list.question_helpfulness} questionId={list.question_id}/>
          <QuestionReportList questionId={list.question_id}/>
          <AddAnswerList questionId={list.question_id} questionBody={list.question_body} pName={this.props.prodName}/>
          <div>
            <AnswerEntryList questionId={list.question_id}/>
          </div>
        </div>
      );
    });
    return (
      <div className="qa-list">
        {list}
        <div className="qa-load">
        </div>
      </div>
    );
  }
}

export default QuestionEntryList;
