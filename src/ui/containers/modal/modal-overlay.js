import React, { PureComponent } from 'react';
import clsx from 'clsx';
import './modal-overlay.less';

class ModalOverlay extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const { onClick, onKeyDown, children, show, animate } = this.props;
    const classNames = clsx('modal-container', animate && 'animateOpacity', show && 'showOverlay');

    return (
      <div className={classNames} onClick={onClick} onKeyDown={onKeyDown}>{ children }</div>
    );
  }
}

export default ModalOverlay;
