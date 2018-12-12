import React, { Component } from 'react';
import CancelButton from '@/ui/components/cancel-button.js';
import './modal.less';

const Modal = (props) => {
  return (
    <div className='modal'>
      { props.children }
      <CancelButton onClick={props.handleOnClose} />
    </div>
  );
}

export default Modal;
