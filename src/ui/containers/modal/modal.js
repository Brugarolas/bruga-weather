import React, { Component } from 'react';
import CancelButton from '@/ui/components/cancel-button.js';
import './modal.less';

class Modal extends Component {
  constructor (props) {
    super(props);
  }

  prevent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  render () {
    let { children, handleOnClose } = this.props;

    return (
      <div className='modal' onClick={this.prevent}>
        { children }
        <CancelButton onClick={handleOnClose} />
      </div>
    )
  }
}

export default Modal;
