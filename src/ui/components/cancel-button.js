import React from 'react';
import './cancel-button.less';

const CancelButton = (props) => {
  const click = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.onClick();
  }

  return (
    <button onClick={click} className='cancel-button'><i className='b-icon b-icon-times-solid icon-cancel'></i></button>
  )
}

export default CancelButton;
