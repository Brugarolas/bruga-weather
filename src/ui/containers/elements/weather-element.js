import React, { Component } from 'react';
import { connect } from "react-redux";
import { getLocationById } from '@/store/selectors/index.js';
import Weather from '@/ui/components/weather.js';
import Actions from '@/store/actions/index.js';

const mapStateToProps = (state, props) => ({
  weather: getLocationById(state, props.weatherId)
});

const mapDispatchToProps = dispatch => {
  return {
    removeLocation: id => dispatch(Actions.removeLocation(id))
  };
};

class WeatherElement extends Component {
  constructor (props) {
    super(props);
  }

  remove = () => {
    const { weatherId, removeLocation } = this.props;

    removeLocation({ id: weatherId });
  }

  shouldComponentUpdate () {
    return !this.props.weather;
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
