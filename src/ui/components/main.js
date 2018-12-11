import React from 'react';
import './main.less';

function Main (props) {
  return (
    <main className='main'>{ props.children }</main>
  )
}

export default Main;
