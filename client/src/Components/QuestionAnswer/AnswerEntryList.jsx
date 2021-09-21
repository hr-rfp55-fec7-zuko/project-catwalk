import React, { useState, useEffect } from 'react';
import AnswerCountList from './AnswerCountList.jsx';
import AnswerReportList from './AnswerReportList.jsx';
import AnswerPhotoList from './AnswerPhotoList.jsx';
import axios from 'axios';
import moment from 'moment';

var AnswerEntryList = (props) => {

  const [answerList, setAnswerList] = useState([]);
  const [btnVal, setBtnVal] = useState(null);
  const [displayItem, setDisplayItem] = useState(null);
  const [subStatus, setSubStatus] = useState(props.status);

  useEffect(()=> {
    let mounted = true;
    GetAnswerList(props.questionId)
      .then(items => {
        if (mounted && subStatus) {
          setAnswerList(items.data);
        }
      });
    return (() => mounted = false);
  }, [props.questionId, subStatus, props.status]);

  useEffect(() => {
    setBtnVal(true);
    setDisplayItem(2);
  }, []);

  useEffect(() => {
    if (!subStatus) {
      GetAnswerList(props.questionId)
        .then(items => {
          setAnswerList(items.data);
        });
    }
  }, [props.questionId, subStatus, props.status]);

  if (answerList.length === 0) {
    return <div></div>;
  }

  var aList = answerList.map(item => {
    return (
      <div className="qa-eachA" key={item.answer_id}>
        <p className="qa-answers-A">
          A:
        </p>
        <p className="qa-answers-main">
          {item.body}
        </p>
        <div className="break"></div>
        {item.photos.length !== 0 &&
          <AnswerPhotoList photos={item.photos} />
        }
        <p className="break"></p>
        <p className="qa-answers-side">
          by <span className="qa-seller" style={{fontWeight: item.answerer_name === 'Seller' ? 900 : 0}}>{item.answerer_name}</span>, {moment(item.date).format('LL')} |
        </p>
        <AnswerCountList helpfulness={item.helpfulness} answerId={item.answer_id}/>
        <AnswerReportList answerId={item.answer_id}/>
      </div>
    );
  });

  var handleClick = (e) => {
    e.preventDefault();
    if (!btnVal) {
      setDisplayItem(2);
    } else {
      setDisplayItem(aList.length);
    }
    setBtnVal(btnVal => !btnVal);
  };

  return (
    <div>
      {aList.slice(0, displayItem)}
      {aList.length > 2 &&
        <button className="qa-load" onClick={(e) => handleClick(e)}>{btnVal ? 'See More Answers' : 'Collapse Answers'}</button>
      }
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