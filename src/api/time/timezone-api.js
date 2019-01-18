import fetch from '@/api/utils/fetch.js';

const BASE_URL = TIMEZONE_URL || 'http://localhost/timezone';

/* API Calls */
const search = async (url) => {
  let response = await fetch(url, { cache: 'force-cache' });

  let json = await response.json();

  return json;
}

const searchCatchErrors = async (url) => {
  try {
    return await search(url);
  } catch (error) {
    return { error: true, msg: error };
  }
}

/* Public API */
const searchTimezone = async (lat, lon) => {
  let url = `${BASE_URL}?lat=${lat}&lon=${lon}`;

  return await searchCatchErrors(url);
}

export default { searchTimezone };
