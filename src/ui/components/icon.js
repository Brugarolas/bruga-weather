import React from 'react';
import './icon.less';

/** Icon CSS classes: check https://openweathermap.org/weather-conditions */
var classes = {
  thunderstorm: ['thunderstorm with light rain', 'thunderstorm with rain', 'thunderstorm with heavy rain', 'light thunderstorm', 'thunderstorm', 'heavy thunderstorm', 'ragged thunderstorm', 'ragged thunderstorm', 'thunderstorm with light drizzle', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle'],
  lightrain: ['light intensity drizzle', 'drizzle', 'light intensity drizzle rain', 'light rain'],
  rain: ['heavy intensity drizzle', 'drizzle rain', 'shower drizzle', 'moderate rain', 'light intensity shower rain'],
  heavyrain: ['heavy intensity drizzle rain', 'shower rain and drizzle', 'heavy shower rain and drizzle', 'heavy intensity rain', 'very heavy rain', 'extreme rain', 'shower rain', 'heavy intensity shower rain', 'ragged shower rain'],
  hail: ['freezing rain', 'sleet', 'shower sleet'],
  lightsnow: ['light snow', 'light shower snow'],
  snow: ['snow', 'light rain and snow', 'rain and snow'],
  heavysnow: ['heavy snow', 'shower snow', 'heavy shower snow'],
  clear: ['clear sky'],
  fewclouds: ['few clouds'],
  clouds: ['scattered clouds'],
  darkclouds: ['broken clouds', 'overcast clouds']
}

const weathers = { }

Object.entries(classes).forEach(([cssClass, weathersDesc]) => {
  weathersDesc.forEach(weather => {
    weathers[weather] = cssClass;
  });
});

/** Icon react */
const Icon = (props) => {
  let classNames = ['weather-icon', weathers[props.weather], props.daytime ? 'day' : 'night'].join(' ');

  return (
    <i className={classNames} />
  )
}

export default Icon;
