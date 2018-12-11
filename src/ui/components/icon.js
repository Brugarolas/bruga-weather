import React from 'react';
import './icon.less';

/** Icon assets: Check https://www.amcharts.com/free-animated-svg-weather-icons/ */
import '@/assets/amcharts-weather-icons/animated/thunder.svg';
import '@/assets/amcharts-weather-icons/animated/rainy-2.svg';
import '@/assets/amcharts-weather-icons/animated/rainy-3.svg';
import '@/assets/amcharts-weather-icons/animated/rainy-4.svg';
import '@/assets/amcharts-weather-icons/animated/rainy-5.svg';
import '@/assets/amcharts-weather-icons/animated/rainy-6.svg';
import '@/assets/amcharts-weather-icons/animated/rainy-7.svg';
import '@/assets/amcharts-weather-icons/animated/snowy-2.svg';
import '@/assets/amcharts-weather-icons/animated/snowy-3.svg';
import '@/assets/amcharts-weather-icons/animated/snowy-4.svg';
import '@/assets/amcharts-weather-icons/animated/snowy-5.svg';
import '@/assets/amcharts-weather-icons/animated/snowy-6.svg';
import '@/assets/amcharts-weather-icons/animated/day.svg';
import '@/assets/amcharts-weather-icons/animated/night.svg';
import '@/assets/amcharts-weather-icons/animated/cloudy-day-1.svg';
import '@/assets/amcharts-weather-icons/animated/cloudy-day-3.svg';
import '@/assets/amcharts-weather-icons/animated/cloudy-night-1.svg';
import '@/assets/amcharts-weather-icons/animated/cloudy-night-3.svg';
import '@/assets/amcharts-weather-icons/animated/cloudy.svg';

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
