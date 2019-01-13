const BASE_URL = TIMEZONE_URL || 'http://localhost/timezone';

/* API Calls */
const search = async (url) => {
  let response = await fetch(url, { cache: 'force-cache' });

  let json = await response.json();

  return json;
}

/* Public API */
const searchTimezone = async (lat, lon) => {
  let url = `${BASE_URL}?lat=${lat}&lon=${lon}`;

  return await search(url);
}

export default { searchTimezone };
