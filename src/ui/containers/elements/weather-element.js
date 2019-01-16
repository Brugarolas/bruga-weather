import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { getLocationById } from '@/store/selectors/index.js';
import Weather from '@/ui/components/weather.js';
import Actions from '@/store/actions/index.js';

const mapStateToProps = (state, props) => ({
  weather: getLocationById(state, props.weatherId)
});

const mapDispatchToProps = dispatch => {
  return {
    hideLocation: id => dispatch(Actions.hideLocation(id)),
    removeLocation: id => dispatch(Actions.removeLocation(id))
  };
};

class WeatherElement extends PureComponent {
  constructor (props) {
    super(props);
  }

  remove = (skipAnimation = false) => {
    const { weatherId, hideLocation, removeLocation } = this.props;

    if (!skipAnimation) {
      hideLocation({ id: weatherId });
    }

    const duration = skipAnimation ? 200 : 500;
    setTimeout(() => {
      removeLocation({ id: weatherId });
    }, duration);
  }

  render () {
    const { weather, weatherId } = this.props;
    if (!weather) return (null);

    return (
      <li className="weather-element">
        <Weather key={weatherId} weather={weather} onClose={this.remove} />
      </li>
    );
  }
}

const ConnectedWeatherElement = connect(mapStateToProps, mapDispatchToProps)(WeatherElement);

export default ConnectedWeatherElement;
