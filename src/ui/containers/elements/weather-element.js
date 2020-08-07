import React, { Component } from 'react';
import Sister from 'sister';
import OpenWeather from '@/api/weather/openweather.js';
import { connect } from 'react-redux';
import { getLocationById } from '@/store/selectors/index.js';
import Weather from '@/ui/components/weather.js';
import Actions from '@/store/actions/index.js';
import Detect from '@/api/utils/detect.js';
import { INCLUDE_UNFINISHED_FEATURES } from '@/constants';

const mapStateToProps = (state, props) => ({
  weather: getLocationById(state, props.weatherId)
});

const mapDispatchToProps = dispatch => {
  return {
    removeLocation: id => dispatch(Actions.removeLocation(id))
  };
};

const getEmitter = (() => {
  const singletonEmitter = Sister();
  return () => singletonEmitter;
})();

class WeatherElement extends Component {
  constructor (props) {
    super(props);
    this.listener = undefined;
  }

  componentDidMount() {
    this.listener = getEmitter().on('selectWeather', this.unselectWeather);
  }

  componentWillUnmount () {
    this.listener && getEmitter().off(this.listener);
  }

  closing = false;

  state = {
    selected: false
  }

  unselectWeather = (newWeatherSelectedId) => {
    if (!this.state.selected || this.props.weather.id === newWeatherSelectedId) {
      return;
    }

    this.setState({
      selected: false,
      forecast: undefined
    });
  }

  showForecast = () => {
    if (!INCLUDE_UNFINISHED_FEATURES) {
      return;
    }

    if (this.state.selected) {
      this.setState({
        selected: false,
        forecast: undefined
      });
      return;
    }

    const { weather } = this.props;
    const request = OpenWeather.forecastCityById(weather.id, weather);

    request.then((response) => {
      const forecastData = {
        id: weather.id,
        city: weather.city,
        forecast: response
      };

      getEmitter().trigger('selectWeather', weather.id);

      this.setState({
        selected: true,
        forecast: forecastData
      });
    });
  }

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

    const { selected, forecast } = this.state;

    return (
      <Weather key={weatherId} weather={weather} onClose={this.remove} showCancelButton={!Detect.isTouchDevice} onClick={this.showForecast} selected={selected} forecast={forecast} />
    );
  }
}

const ConnectedWeatherElement = connect(mapStateToProps, mapDispatchToProps)(WeatherElement);

export default ConnectedWeatherElement;
