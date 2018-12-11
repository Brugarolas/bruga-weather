import React, { PureComponent } from 'react';
import ModalContainer from './modal/modal-container.js';
import Modal from './modal/modal.js';

class Control extends PureComponent {
  constructor (props) {
    super(props);
  }

  state = {
    modalVisible: false
  }

  toggleModal = (media) => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  render () {
    return (
      <ModalContainer visible={this.state.modalVisible}>
        {
          this.state.modalVisible &&
          <Modal handleOnClose={this.toggleModal}>
            <div>Esto es un modal</div>
          </Modal>
        }
      </ModalContainer>
    );
  }
}

export default Control;
