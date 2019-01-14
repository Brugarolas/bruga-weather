import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getLocationsIds } from '@/store/selectors/index.js';
import Weather from './weather.js';
import './weather-list.less';

const mapStateToProps = (state) => {
  return {
    weathersIds: getLocationsIds(state)
  }
}

class WeatherList extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    const { weathersIds } = this.props;

    if (!weathersIds || !weathersIds.length) return (null);

    const weathers = weathersIds.map((weatherId) =>
      <li key={weatherId} className="weather-element"><Weather weatherId={weatherId} /></li>
    );

    return (
      <ul className="weather-list">{ weathers }</ul>
    );
  }
}

const ConnectedWeatherList = connect(mapStateToProps)(WeatherList);

export default ConnectedWeatherList;
