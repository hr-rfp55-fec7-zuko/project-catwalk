import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAnswerModal from './AddAnswerModal.jsx';
import AnswerEntryList from './AnswerEntryList.jsx';
import {PHOTOAPIKEY} from '/client/config.js';

var AddAnswerList = (props) => {
  const modalRef = React.useRef();
  const [answer, setAnswer] = useState('');
  const [nickName, setNickName] = useState('');
  const [emailAdd, setEmailAdd] = useState('');
  const [selectedImg, setSelectedImg] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);


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
      if (selectedFile.length > 5) {
        return alert('You may only upload up to 5 images!');
      } else if (selectedFile.length !== 0) {
        var urlLink = [];
        var PhotoAPI = (obj, cb) => {
          for (var i = 0; i < obj.length; i++) {
            const formData = new FormData();
            formData.append('file', obj[i]);
            formData.append('upload_preset', PHOTOAPIKEY);
            axios.post('https://api.cloudinary.com/v1_1/drbwyfh4x/upload', formData)
              .then(res => {
                urlLink.push(res.data.secure_url);
                if (urlLink.length === selectedFile.length) {
                  return cb(null, urlLink);
                }
              })
              .catch(err => console.log('Cloudinary', err));
          }
        };

        PhotoAPI(selectedFile, (err, data) => {
          axios.post('/qa/questions/:question_id/answers', {params: {qId: props.questionId, inner: {body: answer, name: nickName, email: emailAdd, photos: data}}})
            .then(response => { return (props.updateAnswer(), modalRef.current.close()); })
            .catch(err => console.log('Add Answer POST Err', err));
        });

      } else {
        axios.post('/qa/questions/:question_id/answers', {params: {qId: props.questionId, inner: {body: answer, name: nickName, email: emailAdd}}})
          .then(response => { return (props.updateAnswer(), modalRef.current.close()); })
          .catch(err => console.log('Add Answer POST Err', err));
      }
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      const selectedFileArray = Array.from(e.target.files);
      setSelectedFile(prevFile => prevFile.concat(selectedFileArray));
      setSelectedImg(prevImg => prevImg.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderImg = (source) => {
    return source.map(image => {
      return <img src={image} key={image} height="80" id="upload-image"></img>;
    });
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
              <p className="qa-notice">
                You can upload up to 5 photos.
              </p>
              <div className="break"></div>
              <div id="selectedImage">
                {renderImg(selectedImg)}
              </div>
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