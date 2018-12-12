import Adapt from './adapt.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/';

const DEFAULT_PARAMS = {
  units: 'metric',
  appid: '6388e851d2f6b148929ce780a67f971a'
}

/* Aux API methods */
const buildApiUrl = (operation, params = {}) => buildUrl(`${API_URL}${operation}`, { ...params, ...DEFAULT_PARAMS });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* Public API */
const search = async (url) => {
  let response = await fetch(url, { cache: 'default' });

  let json = await response.json();

  return Adapt.transformWeather(json);
}

const searchCityByName = async (city) => {
  let url = buildApiUrl('weather', { q: city });

  return await search(url);
}

const searchCityById = async (id) => {
  let url = buildApiUrl('weather', { id });

  return await search(url);
}

/* Exports */
export default { searchCityById, searchCityByName };
