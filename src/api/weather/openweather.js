import Adapt from './adapt.js';
import fetch from '@/api/utils/fetch-cache.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/';

const DEFAULT_PARAMS = {
  units: 'metric',
  appid: '6388e851d2f6b148929ce780a67f971a'
};

const MINUTES_10_IN_MS = 1000 * 60 * 10;

/* Aux API methods */
const buildApiUrl = (operation, params = {}) => buildUrl(`${API_URL}${operation}`, { ...params, ...DEFAULT_PARAMS });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* API Calls */
const adaptResponse = (json, operation, options) => {
  if (operation === 'weather') {
    return Adapt.transformWeather(json);
  }
  if (operation === 'group') {
    return json.list.map(Adapt.transformSimple);
  }
  if (operation === 'forecast') {
    const { sunrise, sunset } = options;
    const transformForecastFunction = (forecast) => {
      return Adapt.transformForecast(forecast, sunrise.getTime(), sunset.getTime());
    };

    return json.list.map(transformForecastFunction);
  }

  return json;
};

const search = async (url, operation, extraOptions) => {
  let response = await fetch(url, { cache: 'default', localCache: MINUTES_10_IN_MS });

  let json = await response.json();

  return adaptResponse(json, operation, extraOptions);
}

const apiRequest = async (operation, params, extra) => {
  try {
    const url = buildApiUrl(operation, params);
    return await search(url, operation, extra);
  } catch (error) {
    console.warn(error);
    return { error: true, msg: error };
  }
};

/* Public API */
const searchCityByName = async (city) => {
  return await apiRequest('weather', { q: city });
}

const searchCityById = async (id) => {
  return await apiRequest('weather', { id });
}

const searchCitiesByIds = async (ids) => {
  return await apiRequest('group', { id: ids.join(',') });
}

const forecastCityById = async (id, currentWeather = {}) => {
  return await apiRequest('forecast', { id }, { sunrise: currentWeather.sunrise, sunset: currentWeather.sunset });
};

/* Exports */
export default { searchCityById, searchCitiesByIds, searchCityByName, forecastCityById };
