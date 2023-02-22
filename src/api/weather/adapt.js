import fetch from '@/api/utils/fetch-cache.js';

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

const flagUrl = (country) => {
  return `https://countryflagsapi.com/png/${country.toLowerCase()}`;
}

const flagImage = async (country) => {
  const url = flagUrl(country);
  const response = await fetch(url, { cache: 'default', localCache: true, useBlob: true });
  const blob = await response.blob();

  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader();
      reader.onload = function () { onSuccess(this.result) };
      reader.readAsDataURL(blob);
    } catch (error) {
      onError(erro);
    }
  });
}

const transformSimple = (weather) => {
  return {
    id: weather.id,
    city: weather.name,
    country: weather.sys.country,
    flag: flagImage(weather.sys.country),
    temp: round(weather.main.temp),
    main: weather.weather[0].main,
    descr: weather.weather[0].description,
    sunrise: new Date(weather.sys.sunrise * 1000),
    sunset: new Date(weather.sys.sunset * 1000),
    wind_speed: roundTo2(weather.wind.speed * (3600 / 1000)), //'km/h'
    time: new Date(weather.dt * 1000),
    daytime: weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset,
    location: weather.coord,
    promises: async function () {
      const flagImage = await this.flag
      this.flag = flagImage
    }
  }
}

const transformWeather = (weather) => {
  if (weather.cod !== 200) {
    return { ...weather, error: true };
  }

  return transformSimple(weather);
}

const transformForecast = (forecast, sunrise, sunset) => {
  const date = new Date(forecast.dt_txt);
  const time = date.getTime();

  return {
    temp: round(forecast.main.temp),
    date, time,
    timeString: forecast.dt_txt,
    main: forecast.weather[0].main,
    descr: forecast.weather[0].description,
    daytime: time > sunrise && time < sunset
  };
}

const transformCity = (city) => {
  const adapted = {
    id: city.id,
    name: city.name,
    country: city.sys.country,
    flag: flagImage(city.sys.country),
    temp: kelvinToCelsius(city.main.temp),
    main: city.weather[0].main,
    descr: city.weather[0].description,
    promises: async function () {
      const flagImage = await this.flag
      this.flag = flagImage
    }
  }

  return adapted

}

export default { transformSimple, transformWeather, transformForecast, transformCity };
