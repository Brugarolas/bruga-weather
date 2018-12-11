import React, { Component } from 'react';
import OpenWeather from '@/api/weather/openweather.js';
import WeatherList from '@/ui/components/weather-list.js';
import Control from '@/ui/containers/control.js';

class Home extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <>
        <WeatherList />
        <Control />
      </>
    );
  }
}

export default Home;
