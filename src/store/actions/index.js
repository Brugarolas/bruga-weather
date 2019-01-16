import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS, HIDE_LOCATION, REMOVE_LOCATION, REPLACE_LOCATIONS } = actionTypes;

const addLocation = location => ({ type: ADD_LOCATION, payload: location });
const addMultipleLocations = locations => ({ type: ADD_MULTIPLE_LOCATIONS, payload: locations });
const hideLocation = location => ({ type: HIDE_LOCATION, payload: location });
const removeLocation = location => ({ type: REMOVE_LOCATION, payload: location });
const replaceLocations = locations => ({ type: REPLACE_LOCATIONS, payload: locations });

export default { addLocation, addMultipleLocations, hideLocation, removeLocation, replaceLocations };
