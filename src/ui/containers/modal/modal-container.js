import React from 'react';
import { createPortal } from 'react-dom';
import './modal-container.less';

const ModalContainer = (props) => {
  let { children, visible } = props;
  let classNames = [ 'modal-container', visible ? undefined : 'hidden' ].filter(Boolean).join(' ');
  let modalContainer = document.getElementById('modal');

  return createPortal(<div className={classNames}>{ children }</div>, modalContainer);
}

export default ModalContainer;
