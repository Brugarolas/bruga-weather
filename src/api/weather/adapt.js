const round = (number) => {
  return Math.round(number);
}

const roundTo2 = (number) => {
  return Math.round(number * 100) / 100;
}

const fahrenheitToCelsius = (f) => {
  return Math.round((f - 32) * (5 / 9));
}

const kelvinToCelsius = (k) => {
  return Math.round((k - 273.15));
}

const flag = (country, style = 'shiny', size = 24) => { // styles flat and shiny, sizez 64 48 32 24 16
  return `https://www.countryflags.io/${country}/${style}/${size}.png`; // https://countryflags.io/
}

const transformSimple = (weather) => {
  return {
    id: weather.id,
    city: weather.name,
    country: weather.sys.country,
    flag: flag(weather.sys.country, 'shiny', 32),
    temp: round(weather.main.temp),
    main: weather.weather[0].main,
    descr: weather.weather[0].description,
    sunrise: new Date(weather.sys.sunrise * 1000),
    sunset: new Date(weather.sys.sunset * 1000),
    wind_speed: roundTo2(weather.wind.speed * (3600 / 1000)), //'km/h'
    time: new Date(weather.dt * 1000),
    daytime: weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset,
    location: weather.coord
  }
}

const transformWeather = (weather) => {
  if (weather.cod !== 200) {
    return { ...weather, error: true };
  }

  return transformSimple(weather);
}

const transformCity = (city) => {
  return {
    id: city.id,
    name: city.name,
    country: city.sys.country,
    flag: flag(city.sys.country, 'shiny', 32),
    temp: kelvinToCelsius(city.main.temp),
    main: city.weather[0].main,
    descr: city.weather[0].description
  }
}

export default { transformSimple, transformWeather, transformCity };
