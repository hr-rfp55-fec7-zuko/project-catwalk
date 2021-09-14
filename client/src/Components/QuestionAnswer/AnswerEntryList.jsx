import React, { useState, useEffect } from 'react';
import axios from 'axios';

var AnswerEntryList = (props) => {
  const [answerList, setAnswerList] = useState([]);
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(()=> {
    let mounted = true;
    GetAnswerList(props)
      .then(items => {
        if (mounted) {
          setAnswerList(items.data);
        }
      });
    return () => mounted = false;
  });
  console.log('🥰🥰', answerList);

  return (
    <div>
      {answerList.map(item => {
        return (
          <div>
            <div className="qa-answers-main">
              {item.body}
            </div>
            <div className="qa-answers-side">
              {'by' + item.answerer_name + ',' + item.date}
            </div>
          </div>
        );
      }
      )}
    </div>
  );
};

var GetAnswerList = (props) => {
  return (
    axios.get('/qa/questions/:question_id/answers', {params: {qId: props.questionId}})
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      })
  );
};

export {AnswerEntryList, GetAnswerList};