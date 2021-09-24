import React, { useState, useEffect } from 'react';
import axios from 'axios';

var QuestionCountList = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(props.helpfulness);
  }, [props.helpfulness]);

  const handleClick = () => {
    setCount(props.helpfulness + 1);
    MarkQuestionHelpful(props.questionId)
      // .then(response => setCount(props.helpfulness + 1))
      .catch(error => console.log(error));
  };

  return (
    <div className="qa-questions-count" onClick={handleClick}>Helpful?   <span id="qa-Yes">Yes</span>  ({count}) |</div>
  );
};

var MarkQuestionHelpful = (num) => {
  return (
    axios.put('/qa/questions/:question_id/helpful', {params: {qId: num, page: 1, count: 10}})
  );
};

export default QuestionCountList;