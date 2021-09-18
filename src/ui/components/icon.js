import React from 'react';
import clsx from 'clsx';
import Icons from '@/constants/icons.js';
import './icon.less';

/** Icon CSS classes: check https://openweathermap.org/weather-conditions */
const classes = {
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
};

const icons = {
  thunderstorm: {
    default: Icons.thunder
  },
  lightrain: {
    day: Icons.rainy2,
    night: Icons.rainy4
  },
  rain: {
    day: Icons.rainy3,
    night: Icons.rainy5
  },
  heavyrain: {
    default: Icons.rainy6
  },
  hail: {
    default: Icons.rainy7
  },
  lightsnow: {
    day: Icons.snowy2,
    night: Icons.snowy4
  },
  snow: {
    day: Icons.snowy3,
    night: Icons.snowy5
  },
  heavysnow: {
    default: Icons.snowy6
  },
  clear: {
    day: Icons.day,
    night: Icons.night
  },
  fewclouds: {
    day: Icons.cloudyDay1,
    night: Icons.cloudyNight1
  },
  clouds: {
    day: Icons.cloudyDay3,
    night: Icons.cloudyNight3
  },
  darkclouds: {
    default: Icons.cloudy
  }
}

const weathers = { };

Object.entries(classes).forEach(([cssClass, weathersDesc]) => {
  weathersDesc.forEach(weather => {
    weathers[weather] = cssClass;
  });
});

/** Icon react */
const Icon = (props) => {
  const weather = weathers[props.weather]
  const daytime = props.daytime ? 'day' : 'night'

  const classNames = clsx('weather-icon', weather, daytime);
  const icon = icons[weather][daytime] || icons[weather].default

  return (
    <img className={classNames} src={icon} />
  )
}

export default Icon;
