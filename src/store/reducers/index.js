import produce from 'immer';
import actionTypes from '../constants/action-types.js';
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS, REMOVE_LOCATION, REPLACE_LOCATIONS } = actionTypes;

/* Aux methods */
const findIndexById = (store, id) => {
  return store.findIndex(element => element.id === id);
};

const existsById = (store, id) => {
  return findIndexById(store, id) !== -1;
};

/* Reducer methods */
const addLocation = (state, newLocation) => {
  if (!newLocation || existsById(state.locations, newLocation.id)) return state;

  return produce(state, (draftState) => {
    draftState.locations.push(newLocation);
  });
};

const addMultipleLocations = (state, locations) => {
  if (!locations || !locations.length) return state;

  const newLocations = locations.filter(location => !existsById(state.locations, location.id));

  if (!newLocations.length) return state;

  return produce(state, (draftState) => {
    draftState.locations.push(...newLocations);
  });
};

const removeLocation = (state, location) => {
  if (!location) return state;

  const index = findIndexById(state.locations, location.id);

  if (index === -1) return state;

  return produce(state, (draftState) => {
    draftState.locations.splice(index, 1);
  });
};

const replaceLocations = (state, locations) => {
  if (!locations) return state;

  return produce(state, (draftState) => {
    draftState.locations = locations;
  });
}

/* Reducer */
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return addLocation(state, action.payload);
    case ADD_MULTIPLE_LOCATIONS:
      return addMultipleLocations(state, action.payload);
    case REMOVE_LOCATION:
      return removeLocation(state, action.payload);
    case REPLACE_LOCATIONS:
      return replaceLocations(state, action.payload);
    default:
      return state;
  }
};

export default locationReducer;
