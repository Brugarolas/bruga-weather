import actionTypes from '../constants/action-types.js';
const { ADD_LOCATION, REMOVE_LOCATION } = actionTypes;

const createStorageMiddleware = (locationStorage) => {
  return store => next => action => {
    if (action.type === ADD_LOCATION) {
      locationStorage.addLocation(action.payload);
    }
    if (action.type === REMOVE_LOCATION) {
      locationStorage.removeLocation(action.payload);
    }
    return next(action);
  }
}

export default createStorageMiddleware;
