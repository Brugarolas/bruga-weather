import OpenWeather from '@/api/weather/openweather.js';
import actionTypes from '../constants/action-types.js';
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS, REPLACE_LOCATIONS, ERROR } = actionTypes;

const checkError = (action, response, next) => {
  return response.error ?
    next({ ...action, type: ERROR, payload: undefined }) :
    next({ ...action, payload: response });
}

const singleLocation = async (action, next) => {
  const response = await OpenWeather.searchCityById(action.payload.id);

  action.payload.callback && action.payload.callback();

  return checkError(action, response, next);
}

const multipleLocations = async (action, next) => {
  const response = await OpenWeather.searchCitiesByIds(action.payload);

  return checkError(action, response, next);
}

const searchWeather = store => next => async action => {
  if (action.type === ADD_LOCATION) {
    return await singleLocation(action, next);
  }

  if (action.type === ADD_MULTIPLE_LOCATIONS || action.type === REPLACE_LOCATIONS) {
    return await multipleLocations(action, next);
  }

  return next(action);
};

export default searchWeather;
