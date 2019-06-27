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
const search = async (url) => {
  let response = await fetch(url, { cache: 'default', localCache: MINUTES_10_IN_MS });

  let json = await response.json();

  return json.list ? json.list.map(Adapt.transformSimple) : Adapt.transformWeather(json);
}

const searchCatchErrors = async (url) => {
  try {
    return await search(url);
  } catch (error) {
    return { error: true, msg: error };
  }
}

/* Public API */
const searchCityByName = async (city) => {
  let url = buildApiUrl('weather', { q: city });

  return await searchCatchErrors(url);
}

const searchCityById = async (id) => {
  let url = buildApiUrl('weather', { id });

  return await searchCatchErrors(url);
}

const searchCitiesByIds = async (ids) => {
  let url = buildApiUrl('group', { id: ids.join(',') });

  return await searchCatchErrors(url);
}

/* Exports */
export default { searchCityById, searchCitiesByIds, searchCityByName };
