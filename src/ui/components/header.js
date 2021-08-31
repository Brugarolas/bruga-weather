import React from 'react';
import './header.less';

function Header (props) {
  return (
    <header className="header flex-box">
      <i className="header-icon b-icon b-icon-cloud-sun-rain-solid"></i><span className="header-title">Bruga Weather</span>
      <div className="author">Made with <i className="heart b-icon b-icon-heart-solid"></i> by Andrés Brugarolas</div>
    </header>
  )
}

export default Header;
