import React, { Component } from 'react';
import CancelButton from '@/ui/components/cancel-button.js';
import './modal.less';

const Modal = (props) => {
  const prevent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div className='modal' onClick={prevent}>
      { props.children }
      <CancelButton onClick={props.handleOnClose} />
    </div>
  );
}

export default Modal;
