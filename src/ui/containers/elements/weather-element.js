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

  closing = false;

  remove = () => {
    const { weatherId, removeLocation } = this.props;
    this.closing = true;
    removeLocation({ id: weatherId });
  }

  shouldComponentUpdate () {
    return !this.closing;
  }

  render () {
    const { weather, weatherId } = this.props;
    if (!weather) return (null);

    return (
      <Weather key={weatherId} weather={weather} onClose={this.remove} />
    );
  }
}

const ConnectedWeatherElement = connect(mapStateToProps, mapDispatchToProps)(WeatherElement);

export default ConnectedWeatherElement;
