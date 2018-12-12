import React from 'react';
import Icon from './icon.js';
import './weather.less';

const Weather = (props) => {
  let { weather } = props;

  return (
    <article className='weather'>
      <div className="column-1">
        <div className="name">{ weather.city }</div>
        <div className="desc">{ weather.main }</div>
      </div>

      <div className="column-2">
        <Icon daytime={weather.daytime} weather={weather.descr} />
      </div>

      <div className="column-3">
        <div className="temp">
          <span className="units">{ weather.temp}</span>
          <span className="metrics">°C</span>
        </div>
      </div>
    </article>
  );
}

export default Weather;
