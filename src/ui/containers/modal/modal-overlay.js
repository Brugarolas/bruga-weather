import React, { PureComponent } from 'react';
import './modal-overlay.less';

class ModalOverlay extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    let { onClick, onKeyDown, children, show, animate } = this.props;

    let classNamesArray = [ 'modal-container' ];
    animate && classNamesArray.push('animateOpacity');
    show && classNamesArray.push('showOverlay');

    let classNames = classNamesArray.join(' ');

    return (
      <div className={classNames} onClick={onClick} onKeyDown={onKeyDown}>{ children }</div>
    );
  }
}

export default ModalOverlay;
