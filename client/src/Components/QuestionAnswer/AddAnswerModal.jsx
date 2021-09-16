import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import ReactDom from 'react-dom';

const AddAnswerModal = forwardRef((props, ref) => {
  const [show, setShow] = useState();

  useEffect(() => {
    setShow(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open: () => setShow(true),
      close: () => setShow(false)
    };
  });

  if (show) {
    return ReactDom.createPortal(
      <div className="qa-questions-modal-wrapper">
        <div onClick={close} className="qa-questions-modal-backdrop" />
        <div className="qa-questions-modal-box">
          {props.children}
        </div>
      </div>, document.getElementById('qa-questions-modal'));
  }

  return null;
}
);

export default AddAnswerModal;