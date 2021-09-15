import React from 'react';
import {AnswerEntryList, GetAnswerList} from './AnswerEntryList.jsx';
import QuestionCountList from './QuestionCountList.jsx';

class QuestionEntryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = this.props.lists.map(list => {
      return (
        <div>
          <li className="qa-questions">{'Q: ' + list.question_body}</li>
          <QuestionCountList helpfulness={list.question_helpfulness} questionId={list.question_id}/>
          <ul>
            <AnswerEntryList questionId={list.question_id}/>
          </ul>
        </div>
      );
    });
    return (
      <div>
        {list}
        <div className="qa-load">
        </div>
      </div>
    );
  }
}

export default QuestionEntryList;
