import React from 'react';
import { createPortal } from 'react-dom';
import FlipMove from 'react-flip-move';
import ModalOverlay from './modal-overlay';

const ModalContainer = (props) => {
  let { children, visible, exit } = props;
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

  return createPortal(
    <ModalOverlay visible={visible} onClick={click} onKeyDown={keyDown}>
      <FlipMove typeName={null} duration={300}>
        { children }
      </FlipMove>
    </ModalOverlay>,
    modalContainer
  );
}

export default ModalContainer;
