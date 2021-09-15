import React, { useState, useEffect } from 'react';
import axios from 'axios';


var AnswerReportList = (props) => {
  const [report, setReport] = useState('');

  useEffect(() => {
    setReport('Report');
  }, []);

  const handleClick = () => {
    setReport('Reported');
    MarkAnswerReported(props.answerId)
      // .then(response => setReport('Reported'))
      .catch(error => console.log(error));
  };

  return (
    <a className="qa-answers-report" onClick={handleClick}>{report}</a>
  );
};

var MarkAnswerReported = (num) => {
  return (
    axios.put('/qa/answers/:answer_id/report', {params: {aId: num}})
  );
};

export default AnswerReportList;