import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS, REMOVE_LOCATION } = actionTypes;

const addLocation = location => ({ type: ADD_LOCATION, payload: location });
const addMultipleLocations = locations => ({ type: ADD_MULTIPLE_LOCATIONS, payload: locations });
const removeLocation = location => ({ type: REMOVE_LOCATION, payload: location });

export default { addLocation, addMultipleLocations, removeLocation };
