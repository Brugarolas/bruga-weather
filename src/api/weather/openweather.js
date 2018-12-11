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
const searchCity = async (city) => {
  let url = buildApiUrl('weather', { q: city });

  let response = await fetch(url, { cache: 'no-cache' });

  return await response.json();
}

/* Exports */
export default { searchCity };
