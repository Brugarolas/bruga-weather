import Adapt from './adapt.js';
import ArrayUtils from '@/api/utils/array.js';
import fetch from '@/api/utils/fetch-cache.js';

const API_URL = 'https://openweathermap.org/data/2.5/find';

/*
 * URL and appid hacked from https://openweathermap.org/ (check API call when searching a city)
 * Example (07 August 2020): https://openweathermap.org/data/2.5/find?q=Madrid&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric
 */
const DEFAULT_PARAMS = {
  type: 'like', // old - necessary?
  sort: 'population', // old - necessary?
  cnt: '30', // old - necessary?
  units: 'metric', // new - test how it works so we maybe could remove some adapt.js code
  appid: '439d4b804bc8187953eb36d2a8c26a02' // old - 'b6907d289e10d714a6e88b30761fae22'
}

/* Aux API methods */
const buildApiUrl = (params = {}) => buildUrl(`${API_URL}`, { ...params, ...DEFAULT_PARAMS });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* API Calls */
const search = async (url) => {
  let response = await fetch(url, { cache: 'default', localCache: true });

  let json = await response.json();

  return ArrayUtils.removeDuplicatesById(json.list).map(Adapt.transformCity);
}

const searchCatchErrors = async (url) => {
  try {
    return await search(url);
  } catch (error) {
    return { error: true, msg: error };
  }
}

/* Public API */
const searchCity = async (city) => {
  let url = buildApiUrl({ q: city });

  return await searchCatchErrors(url);
}

/* Exports */
export default { searchCity };
