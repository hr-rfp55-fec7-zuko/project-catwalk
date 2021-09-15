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
          <li>
            <div className="qa-answers-main">
              A: {item.body}
            </div>
            <div className="qa-answers-side">
              by {item.answerer_name}, {moment(item.date).format('LL')}
            </div>
            <AnswerCountList helpfulness={item.helpfulness} answerId={item.answer_id}/>
            <AnswerReportList answerId={item.answer_id}/>
          </li>
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

export {AnswerEntryList, GetAnswerList};