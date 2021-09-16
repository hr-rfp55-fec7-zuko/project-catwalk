import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAnswerModal from './AddAnswerModal.jsx';

var AddAnswerList = (props) => {
  const modalRef = React.useRef();

  return (
    <div>
      <a onClick={() => modalRef.current.open()}> Add Answer</a>
      <AddAnswerModal ref={modalRef}>
        <h1>Submit your Answer</h1>
        <h2>: {props.questionBody}</h2>
        <div>
          <form className="qa-questions-modal-form">
            <label className="qa-questions-modal-1">
              Your Answer*
              <br/>
              <textarea maxLength="1000"></textarea>
              <br/>
            </label>
            <label className="qa-questions-modal-2">
              What is your nickname*
              <br/>
              <textarea maxLength="60" placeholder="Example: Zuko"></textarea>
              <br/>
              For privacy reasons, do not use your full name or email address.
              <br/>
            </label>
            <label className="qa-questions-modal-3">
              What is your email*
              <br/>
              <textarea maxLength="60" placeholder="Example: zuko@zuko.com"></textarea>
              <br/>
              For authentication reasons, you will not be emailed.
              <br/>
            </label>
            <br />
            <button className="qa-questions-modal-button">
              Upload Your Photos
            </button>
          </form>
        </div>
        <br />
        <button className="qa-questions-modal-button" >
          Submit Answer
        </button>
        <button className="qa-questions-modal-button" onClick={() => modalRef.current.close()}>
          Close
        </button>
        <p>
          <br />
          *Mandatory
        </p>
      </AddAnswerModal>
    </div>
  );
};

export default AddAnswerList;