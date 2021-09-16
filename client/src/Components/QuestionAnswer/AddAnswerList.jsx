import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAnswerModal from './AddAnswerModal.jsx';

var AddAnswerList = (props) => {

  const modalRef = React.useRef();
  const [answer, setAnswer] = useState('');
  const [nickName, setNickName] = useState('');
  const [emailAdd, setEmailAdd] = useState('');

  const handleSubmit = () => {
    const errMsg = [];
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (answer.length === 0) {
      errMsg.push('answer');
    } else if (nickName.length === 0) {
      errMsg.push('nickname');
    } else if (emailAdd.length === 0) {
      errMsg.push('email');
    }

    if (errMsg.length !== 0) {
      var errRes = 'You must enter the following: ';
      for (var i = 0; i < errMsg.length; i++) {
        if (i !== errMsg.length - 1) {
          errRes += errMsg[i] + ',';
        } else {
          errRes += errMsg[i] + '.';
        }
      }
      alert(errRes);
    } else if (!re.test(String(emailAdd).toLowerCase())) {
      alert('Please enter email in the correct format.');
    } else {
      axios.post('/qa/questions/:question_id/answers', {params: {qId: props.questionId, inner: {body: answer, name: nickName, email: emailAdd}}})
        .then(response => console.log('🥰🥰!!!', response.status))
        .catch(err => console.log('Add Answer POST Err'));
    }

  };

  return (
    <div>
      <a onClick={() => modalRef.current.open()} className="qa-questions-add-answer">Add Answer</a>
      <AddAnswerModal ref={modalRef}>
        <h1>Submit your Answer</h1>
        <h2>{props.pName} : {props.questionBody}</h2>
        <div>
          <form className="qa-questions-modal-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <label className="qa-questions-modal-1">
              Your Answer*
              <br/>
              <textarea maxLength="1000" onChange={(e) => { e.preventDefault(); setAnswer(e.target.value); }}/>
              <br/>
            </label>
            <label className="qa-questions-modal-2">
              What is your nickname*
              <br/>
              <textarea maxLength="60" placeholder="Example: Zuko" onChange={(e) => { e.preventDefault(); setNickName(e.target.value); }}/>
              <br/>
              For privacy reasons, do not use your full name or email address.
              <br/>
            </label>
            <label className="qa-questions-modal-3">
              What is your email*
              <br/>
              <textarea maxLength="60" placeholder="Example: zuko@zuko.com" onChange={(e) => { e.preventDefault(); setEmailAdd(e.target.value); }}/>
              <br/>
              For authentication reasons, you will not be emailed.
              <br/>
            </label>
            <br />
            {/* TO DO Advanced Content
            <button className="qa-questions-modal-button">
              Upload Your Photos
            </button> */}
            <button className="qa-questions-modal-button" type="submit">
              Submit Answer
            </button>
            <button className="qa-questions-modal-button" onClick={() => modalRef.current.close()}>
              Close
            </button>
          </form>
        </div>
        <br />

        <p>
          <br />
          *Mandatory
        </p>
      </AddAnswerModal>
    </div>
  );
};

export default AddAnswerList;