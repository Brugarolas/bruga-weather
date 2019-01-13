import OpenWeather from '@/api/weather/openweather.js';
import actionTypes from '../constants/action-types.js';
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS, REPLACE_LOCATIONS } = actionTypes;

const searchWeather = store => next => async action => {
  if (action.type === ADD_LOCATION) {
    const location = await OpenWeather.searchCityById(action.payload.id); // TODO Handle errors
    action.payload.callback();
    return next({ ...action, payload: location });
  }

  if (action.type === ADD_MULTIPLE_LOCATIONS || action.type === REPLACE_LOCATIONS) {
    const locations = await OpenWeather.searchCitiesByIds(action.payload); // TODO Handle errors
    return next({ ...action, payload: locations });
  }

  return next(action);
};

export default searchWeather;
