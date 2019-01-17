import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS,  REMOVE_LOCATION, REPLACE_LOCATIONS } = actionTypes;

const addLocation = location => ({ type: ADD_LOCATION, payload: location });
const addMultipleLocations = locations => ({ type: ADD_MULTIPLE_LOCATIONS, payload: locations });
const removeLocation = location => ({ type: REMOVE_LOCATION, payload: location });
const replaceLocations = locations => ({ type: REPLACE_LOCATIONS, payload: locations });

export default { addLocation, addMultipleLocations, removeLocation, replaceLocations };
