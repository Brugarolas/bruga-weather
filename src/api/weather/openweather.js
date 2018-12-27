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

/* API Calls */
const search = async (url) => {
  let response = await fetch(url, { cache: 'default' });

  let json = await response.json();

  return json.list ? json.list.map(Adapt.transformSimple) : Adapt.transformWeather(json);
}

/* Public API */
const searchCityByName = async (city) => {
  let url = buildApiUrl('weather', { q: city });

  return await search(url);
}

const searchCityById = async (id) => {
  let url = buildApiUrl('weather', { id });

  return await search(url);
}

const searchCitiesByIds = async (ids) => {
  let url = buildApiUrl('group', { id: ids.join(',') });

  return await search(url, true);
  /*let response = await fetch(url, { cache: 'default' });

  let json = await response.json();

  console.log(json);*/
}

/* Exports */
export default { searchCityById, searchCitiesByIds, searchCityByName };
