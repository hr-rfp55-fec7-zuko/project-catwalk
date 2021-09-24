import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAnswerModal from './AddAnswerModal.jsx';


var AddQuestionList = (props) => {

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
      axios.post('/qa/questions', {params: {body: answer, name: nickName, email: emailAdd, 'product_id': parseInt(props.pId)}})
        .then(response => props.updateQuestion(), modalRef.current.close())
        .catch(err => console.log('Add Question POST Err', err));
    }
  };

  return (
    <div>
      <button onClick={() => modalRef.current.open()} className="qa-button">ADD A QUESTION
        <i className="fas fa-plus qa-button-icon"></i>
      </button>
      <AddAnswerModal ref={modalRef}>
        <h1>Ask Your Question</h1>
        <h2>About the {props.pName}</h2>
        <div>
          <form className="qa-questions-modal-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <label className="qa-questions-modal-1">
              Your Question*
              <br/>
              <textarea maxLength="1000" rows="4" cols="50" onChange={(e) => { e.preventDefault(); setAnswer(e.target.value); }}/>
              <br/>
            </label>
            <br/>
            <label className="qa-questions-modal-2">
              What is your nickname*
              <br/>
              <textarea maxLength="60" rows="4" cols="50" className="qa-withplaceholder" placeholder="Example: Zuko" onChange={(e) => { e.preventDefault(); setNickName(e.target.value); }}/>
              <br/>
              <p className="qa-notice">
                For privacy reasons, do not use your full name or email address.
              </p>
              <br/>
            </label>
            <label className="qa-questions-modal-3">
              What is your email*
              <br/>
              <textarea maxLength="60" rows="4" cols="50" className="qa-withplaceholder" placeholder="Example: zuko@zuko.com" onChange={(e) => { e.preventDefault(); setEmailAdd(e.target.value); }}/>
              <br/>
              <p className="qa-notice">
                For authentication reasons, you will not be emailed.
              </p>
            </label>
            <br />
            <button className="qa-questions-modal-button" type="submit">
              Submit Question
            </button>
            <i className="fas fa-times fa-3x qa-photos-icon-modal" onClick={() => modalRef.current.close()}></i>
          </form>
        </div>
        <p>
          <br />
          *Mandatory
        </p>
      </AddAnswerModal>
    </div>
  );
};

export default AddQuestionList;