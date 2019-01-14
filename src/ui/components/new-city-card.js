import React from 'react';
import rainy6 from '@/assets/amcharts-weather-icons/animated/rainy-6.svg';
import './new-city-card.less';

const NewCityCard = (props) => {
  return (
    <article className="new-city-card" onClick={props.onClick} >
      <div className="container icons">
        <img className="icon-rain" src={rainy6} />
        <i className="fas fa-city icon-city"></i>
      </div>
      <div className="container">
        <h4 className="title">New Location</h4>
        <p className="description">Add weather forecast for a new location</p>
      </div>
    </article>
  );
}

export default NewCityCard;
