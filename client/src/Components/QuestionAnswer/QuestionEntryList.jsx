import React from 'react';
import {AnswerEntryList, GetAnswerList} from './AnswerEntryList.jsx';


class QuestionEntryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.lists);
    var list = this.props.lists.map(list => {
      return (
        <div>
          <li className="qa-questions">{'Q: ' + list.question_body}</li>
          <div>
            Helpful? Yes ({list.question_helpfulness})
          </div>
          <div>
            <AnswerEntryList questionId={list.question_id}/>
          </div>
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
