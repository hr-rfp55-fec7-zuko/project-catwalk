import React, { useState, useEffect } from 'react';
import axios from 'axios';


var AnswerCountList = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(props.helpfulness);
  }, [props.helpfulness]);

  const handleClick = () => {
    setCount(props.helpfulness + 1);
    MarkAnswerHelpful(props.answerId)
      // .then(response => setCount(props.helpfulness + 1))
      .catch(error => console.log(error));
  };

  return (
    <a className="qa-answers-helpfulness" onClick={handleClick}>Helpful? <span id="qa-Yes">Yes</span>({count})</a>
  );
};

var MarkAnswerHelpful = (num) => {
  return (
    axios.put('/qa/answers/:answer_id/helpful', {params: {aId: num}})
  );
};

export default AnswerCountList;