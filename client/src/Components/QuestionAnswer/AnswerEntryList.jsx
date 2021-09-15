import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

var AnswerEntryList = (props) => {
  const [answerList, setAnswerList] = useState([]);
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };
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
  console.log('🥰🥰', answerList);

  return (
    <div>
      {answerList.map(item => {
        console.log(moment(item.date).format('LL'));
        return (
          <div>
            <div className="qa-answers-main">
              {item.body}
            </div>
            <div className="qa-answers-side">
              {'by' + item.answerer_name + ', ' + moment(item.date).format('LL')}
            </div>
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

export {AnswerEntryList, GetAnswerList};