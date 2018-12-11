const round = (number) => {
  return Math.round(number);
}

const roundTo2 = (number) => {
  return Math.round(number * 100) / 100;
}

const transform = (weather) => {
  return {
    id: weather.sys.id,
    city: weather.name,
    country: weather.sys.country,
    temp: round(weather.main.temp),
    main: weather.weather[0].main,
    descr: weather.weather[0].description,
    sunrise: new Date(weather.sys.sunrise * 1000),
    sunset: new Date(weather.sys.sunset * 1000),
    wind_speed: roundTo2(weather.wind.speed * (3600 / 1000)), //'km/h'
    time: new Date(weather.dt * 1000),
    daytime: weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset
  }
}

export default { transform };
