import Adapt from './adapt.js';

const API_URL = 'https://openweathermap.org/data/2.5/find';

const DEFAULT_PARAMS = { // URL and appid hacked from https://openweathermap.org/data/2.5/find (check API call when finding)
  type: 'like',
  sort: 'population',
  cnt: '30',
  appid: 'b6907d289e10d714a6e88b30761fae22'
}

/* Aux API methods */
const buildApiUrl = (params = {}) => buildUrl(`${API_URL}`, { ...params, ...DEFAULT_PARAMS });

const buildUrl = (url, params) => `${url}?${paramsToUrl(params)}`;

const paramsToUrl = (params = {}) => Object.entries(params).map((param) => paramToUrl(...param)).join('&');

const paramToUrl = (name, value) => name + (value ? '=' + value : '');

/* Public API */
const searchCity = async (city) => {
  let url = buildApiUrl({ q: city });

  let response = await fetch(url, { cache: 'force-cache' });

  let json = await response.json();

  return json.list.map(Adapt.transformCity);
}

/* Exports */
export default { searchCity };
