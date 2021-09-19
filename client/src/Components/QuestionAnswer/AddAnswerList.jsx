import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAnswerModal from './AddAnswerModal.jsx';
import AnswerEntryList from './AnswerEntryList.jsx';

var AddAnswerList = (props) => {
  const modalRef = React.useRef();
  const [answer, setAnswer] = useState('');
  const [nickName, setNickName] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [photo, setPhoto] = useState('');

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
      if (photo.length !== 0) {
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', 'em0fglum');

        axios.post('https://api.cloudinary.com/v1_1/drbwyfh4x/upload', formData)
          .then(res => {
            return (
              axios.post('/qa/questions/:question_id/answers', {params: {qId: props.questionId, inner: {body: answer, name: nickName, email: emailAdd, photos: [res.data.secure_url]}}})
                .then(response => { return (props.updateAnswer(), modalRef.current.close()); })
                .catch(err => console.log('Add Answer POST Err', err))
            );
          })
          .catch(err => console.log(err));
      } else {
        axios.post('/qa/questions/:question_id/answers', {params: {qId: props.questionId, inner: {body: answer, name: nickName, email: emailAdd}}})
          .then(response => { return (props.updateAnswer(), modalRef.current.close()); })
          .catch(err => console.log('Add Answer POST Err', err));
      }
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    setPhoto(e.target.files[0]);
    const preview = document.getElementById('upload-image');
    const selectedFile = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      preview.src = reader.result;
    }, false);

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <React.Fragment>
      <p onClick={() => modalRef.current.open()} className="qa-questions-addanswer" id="qa-Yes">Add Answer</p>
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
              <textarea className="qa-withplaceholder" maxLength="60" placeholder="Example: Zuko" onChange={(e) => { e.preventDefault(); setNickName(e.target.value); }}/>
              <br/>
              <p className="qa-notice">
                For privacy reasons, do not use your full name or email address.
              </p>
              <br/>
            </label>
            <label className="qa-questions-modal-3">
              What is your email*
              <br/>
              <textarea className="qa-withplaceholder" maxLength="60" placeholder="Example: zuko@zuko.com" onChange={(e) => { e.preventDefault(); setEmailAdd(e.target.value); }}/>
              <br/>
              <p className="qa-notice">
                For authentication reasons, you will not be emailed.
              </p>
              <br/>
            </label>
            <label className="qa-questions-modal-4">
              Upload your photos
              <div className="break"></div>
              <input type="file" id="select-file" name="filename" className="qa-modal-file-button" multiple={true} onChange={e => handleImage(e)}></input>
              <div className="break"></div>
              <img src="" height="50" id="upload-image"></img>
            </label>
            <br />
            <button className="qa-questions-modal-button" type="submit">
              Submit Answer
            </button>
            <i className="fas fa-times fa-3x qa-photos-icon-modal" onClick={() => modalRef.current.close()}></i>
          </form>
        </div>
        <p>
          <br />
          *Mandatory
        </p>
      </AddAnswerModal>
    </React.Fragment>
  );
};

export default AddAnswerList;