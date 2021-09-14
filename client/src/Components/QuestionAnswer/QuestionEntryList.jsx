import React from 'react';
import AnswerEntryList from './AnswerEntryList.jsx';


class QuestionEntryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var list = this.props.lists.map(list => {
      return (
        <div>
          <li className="qa-questions">{'Q: ' + list.question_body}</li>
          <div>
            Helpful? Yes ({list.question_helpfulness})
          </div>
          <div>
            <AnswerEntryList />
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
