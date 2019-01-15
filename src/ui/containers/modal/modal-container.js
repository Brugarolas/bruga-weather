import React from 'react';
import { createPortal } from 'react-dom';
import './modal-container.less';

const ModalContainer = (props) => {
  let { children, visible, exit } = props;
  let classNames = [ 'modal-container', visible ? undefined : 'hidden' ].filter(Boolean).join(' ');
  let modalContainer = document.getElementById('modals');

  const click = (event) => {
    event.preventDefault();
    event.stopPropagation();
    exit();
  }

  const keyDown = (event) => {
    if (event.keyCode === 27) { // ESC key
      exit();
    }
  }

  return createPortal(<div className={classNames} onClick={click} onKeyDown={keyDown}>{ children }</div>, modalContainer);
}

export default ModalContainer;
