import React, { Component } from 'react';
import OpenWeather from '@/api/weather/openweather.js';
import Adapt from '@/api/weather/adapt.js';
import WeatherList from '@/ui/components/weather-list.js';

class Home extends Component {
  constructor (props) {
    super(props);
  }

  state = { }

  addWeatherLocation = (cityName) => {
    OpenWeather.searchCity(cityName).then((weather) => {
      let weathers = this.state.weathers || [];
      this.setState({ weathers: [ ...weathers, Adapt.transform(weather) ] });
    });
  }

  componentWillMount() {
    this.addWeatherLocation('Madrid');
    this.addWeatherLocation('London');
    this.addWeatherLocation('Barcelona');
    this.addWeatherLocation('Paris');
    this.addWeatherLocation('Osaka');
    this.addWeatherLocation('Anchorage');
    this.addWeatherLocation('Buenos Aires');
    this.addWeatherLocation('Moscow');
    this.addWeatherLocation('Tokyo');
  }

  render () {
    return <WeatherList weathers={this.state.weathers} />;
  }
}

export default Home;
