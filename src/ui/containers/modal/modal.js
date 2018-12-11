import React, { Component } from 'react';
import './modal.less';

const Modal = (props) => {
  return (
    <div className='modal'>
      { props.children }
      <button onClick={props.handleOnClose} className='close-button'><i className='fas fa-times icon-close'></i></button>
    </div>
  );
}

export default Modal;
