import React from 'react';
import Icon from './icon.js';
import './weather.less';

const Weather = (props) => {
  let { weather } = props;

  return (
    <article className='weather'>
      <div className="column-1">
        <div className="city">{ weather.city }</div>
        <div className="descr">{ weather.main }</div>
        <div className="descr">{ weather.descr }</div>
        <Icon daytime={weather.daytime} weather={weather.descr} />
        <div className="temp">
          <span className="units">{ weather.temp}</span>
          <span className="metrics">°C</span>
        </div>
      </div>
    </article>
  );
}

export default Weather;
