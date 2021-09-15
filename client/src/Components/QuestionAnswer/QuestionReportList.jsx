import React, { useState, useEffect } from 'react';
import axios from 'axios';


var QuestionReportList = (props) => {
  const [report, setReport] = useState('');

  useEffect(() => {
    setReport('Report');
  }, []);

  const handleClick = () => {
    setReport('Reported');
    MarkQuestionReported(props.questionId)
      // .then(response => setReport('Reported'))
      .catch(error => console.log(error));
  };

  return (
    <a className="qa-questions-report" onClick={handleClick}>{report}</a>
  );
};

var MarkQuestionReported = (num) => {
  return (
    axios.put('/qa/questions/:question_id/report', {params: {qId: num}})
  );
};

export default QuestionReportList;