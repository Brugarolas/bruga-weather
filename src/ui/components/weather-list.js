import React from 'react';
import Weather from './weather.js';
import './weather-list.less';

const WeatherList = (props) => {
  if (!props.weathers) return <div></div>;

  const weathers = props.weathers.map((weather) =>
    <li key={weather.id} className="weather-element"><Weather weather={weather} /></li>
  );

  return (
    <ul className="weather-list">{ weathers }</ul>
  );
}

export default WeatherList;
