import React from 'react';
import './new-city-card.less';

const NewCityCard = (props) => {
  return (
    <div className="new-city-card" onClick={props.onClick} >
      <div className="container icons">
        <img className="icon-rain" src="/img/rainy-6.svg" />
        <i className="fas fa-city icon-city"></i>
      </div>
      <div className="container">
        <h4 className="title">New Location</h4>
        <p className="description">Add weather forecast for a new location</p>
      </div>
    </div>
  );
}

export default NewCityCard;
