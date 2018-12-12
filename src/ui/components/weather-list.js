import React from 'react';
import { connect } from "react-redux";
import Weather from './weather.js';
import './weather-list.less';

const mapStateToProps = (state) => {
  return {
    weathers: state.locations
  }
}

const WeatherList = (props) => {
  if (!props.weathers || !props.weathers.length) return <></>;

  const weathers = props.weathers.map((weather) =>
    <li key={weather.id} className="weather-element"><Weather weather={weather} /></li>
  );

  return (
    <ul className="weather-list">{ weathers }</ul>
  );
}

const ConnectedWeatherList = connect(mapStateToProps)(WeatherList);

export default ConnectedWeatherList;
