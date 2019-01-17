import React, { PureComponent } from 'react';
import './modal-overlay.less';

class ModalOverlay extends PureComponent {
  constructor (props) {
    super(props);
  }

  state = {
    animationVisible: false,
    modalVisible: false
  }

  static getDerivedStateFromProps(props, state) {
    let { visible } = props;
    if (state.modalVisible === visible) return null;

    return {
      animationVisible: false,
      modalVisible: true
    }
  }

  componentDidUpdate () {
    let { visible } = this.props;

    if (visible) {
      this.enterAnimation();
    } else {
      this.leaveAnimation();
    }
  }

  enterAnimation () {
    setTimeout(() => {
      this.setState({
        animationVisible: true
      })
    });
  }

  leaveAnimation () {
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
    }, 300);
  }

  render () {
    let { onClick, onKeyDown, children } = this.props;
    let { animationVisible, modalVisible } = this.state;

    let classNamesArray = [ 'modal-container' ];
    animationVisible && classNamesArray.push('showAnimation');
    modalVisible && classNamesArray.push('visible');

    let classNames = classNamesArray.join(' ');

    return (
      <div className={classNames} onClick={onClick} onKeyDown={onKeyDown}>{ children }</div>
    );
  }
}

export default ModalOverlay;
