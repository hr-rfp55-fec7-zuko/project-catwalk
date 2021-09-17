import React, { useState, useEffect } from 'react';
import AnswerCountList from './AnswerCountList.jsx';
import AnswerReportList from './AnswerReportList.jsx';
import axios from 'axios';
import moment from 'moment';

var AnswerEntryList = (props) => {
  const [answerList, setAnswerList] = useState([]);
  useEffect(()=> {
    let mounted = true;
    GetAnswerList(props.questionId)
      .then(items => {
        if (mounted) {
          setAnswerList(items.data);
        }
      });
    return () => mounted = false;
  }, [props.questionId]);

  return (
    <div>
      {answerList.map(item => {
        return (
          <div>
            <p className="qa-answers-A">
              A:
            </p>
            <p className="qa-answers-main">
              {' ' + item.body}
            </p>
            <p className="qa-answers-side">
              by {item.answerer_name}, {moment(item.date).format('LL')}
            </p>
            <AnswerCountList helpfulness={item.helpfulness} answerId={item.answer_id}/>
            <AnswerReportList answerId={item.answer_id}/>
          </div>
        );
      }
      )}
    </div>
  );
};

var GetAnswerList = (num) => {
  return (
    axios.get('/qa/questions/:question_id/answers', {params: {qId: num}})
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      })
  );
};

export default AnswerEntryList;