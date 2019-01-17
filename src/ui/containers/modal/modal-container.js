import React, { PureComponent } from 'react';
import FlipMove from 'react-flip-move';
import ModalOverlay from './modal-overlay';
import { createPortal } from 'react-dom';
import animations from '@/api/utils/animations.js';

class ModalContainer extends PureComponent {
  constructor (props) {
    super(props);
  }

  state = {
    show: false,
    animate: false
  }

  click = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.exit();
  }

  keyDown = (event) => {
    if (event.keyCode === 27) { // ESC key
      this.props.exit();
    }
  }

  startAnimation = (childElement, domNode) => {
    const { visible } = this.props;

    visible && this.setState({ show: visible });
    this.setState({ animate: visible }) // display:'none' breaks CSS animation!
  }

  finishAnimation = (childElement, domNode) => {
    const { visible } = this.props;

    !visible && this.setState({ show: visible });
  }

  render () {
    const modalContainer = document.getElementById('modals');
    const { click, keyDown, startAnimation, finishAnimation } = this;
    const { show, animate } = this.state;

    return createPortal(
      <ModalOverlay show={show} animate={animate} onClick={click} onKeyDown={keyDown}>
        <FlipMove typeName={null} duration={300} leaveAnimation={animations.elevator}
          onStart={startAnimation} onFinish={finishAnimation}>
          { this.props.children }
        </FlipMove>
      </ModalOverlay>,
      modalContainer
    );
  }
}

export default ModalContainer;
