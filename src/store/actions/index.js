import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, REMOVE_LOCATION } = actionTypes;

const addLocation = location => ({ type: ADD_LOCATION, payload: location });
const removeLocation = location => ({ type: REMOVE_LOCATION, payload: location });

export default { addLocation, removeLocation };
