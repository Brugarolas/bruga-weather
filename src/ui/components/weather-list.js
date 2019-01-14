import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getLocationsIds } from '@/store/selectors/index.js';
import FlipMove from 'react-flip-move';
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
    const hasWeathers = weathersIds && weathersIds.length > 0;

    const weathers = hasWeathers ? weathersIds.map((weatherId) =>
      <li key={weatherId} className="weather-element"><Weather key={weatherId} weatherId={weatherId} /></li>
    ) : null;

    return (
      <ul className="weather-list">
        <FlipMove typeName={null}>
          { hasWeathers && weathers }
          <li key="children" className="weather-element">
            { this.props.children }
          </li>
        </FlipMove>
      </ul>
    );
  }
}

const ConnectedWeatherList = connect(mapStateToProps)(WeatherList);

export default ConnectedWeatherList;
