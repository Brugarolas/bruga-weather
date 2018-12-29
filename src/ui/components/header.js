import React from 'react';
import './header.less';

function Header (props) {
  return (
    <header className="header flex-box">
      <i className="header-icon fas fa-cloud-sun-rain"></i><span className="header-title">Bruga Weather</span>
      <div className="author">Made with <i className="heart fas fa-heart"></i> by Andrés Brugarolas</div>
    </header>
  )
}

export default Header;
