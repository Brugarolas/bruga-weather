import React, { Component } from 'react';
import './weather-forecast.less';

class WeatherList extends Component {
  constructor (props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return Boolean(nextProps.forecast);
  }

  render () {
    const { forecast } = this.props;

    return (<span className='soon-forecast'>Shortly forecast for {forecast.city} will be here</span>);
  }
}

export default WeatherList;
