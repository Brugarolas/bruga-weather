import React from 'react';
import { connect } from "react-redux";
import Icon from './icon.js';
import CancelButton from '@/ui/components/cancel-button.js';
import Actions from '@/store/actions/index.js';
import './weather.less';

const mapDispatchToProps = dispatch => {
  return {
    removeLocation: id => dispatch(Actions.removeLocation(id))
  };
};

const Weather = (props) => {
  const { weather } = props;

  const click = () => {
    props.removeLocation({ id: weather.id });
  }

  return (
    <article className='weather'>
      <div className="column-1">
        <div className="name">{ weather.city } (<img className="flag" src={weather.flag} />)</div>
        <div className="desc">{ weather.main }</div>
      </div>

      <div className="column-2">
        <div className="weather-icon-wrapper">
          <Icon daytime={weather.daytime} weather={weather.descr} />
        </div>

        <div className="temp">
          <span className="units">{ weather.temp}</span>
          <span className="metrics">°C</span>
        </div>
      </div>

      <CancelButton onClick={click} />
    </article>
  );
}

const ConnectedWeather = connect(undefined, mapDispatchToProps)(Weather);

export default ConnectedWeather;
