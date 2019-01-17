import actionTypes from '../constants/action-types.js';
const { ADD_LOCATION, ADD_MULTIPLE_LOCATIONS, REMOVE_LOCATION, REPLACE_LOCATIONS } = actionTypes;

const existsById = (store, id) => {
  return !!store.find(element => element.id === id);
}

const removeById = (store, id) => {
  return store.filter(element => element.id !== id);
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      if (existsById(state.locations, action.payload.id)) return state;
      return { ...state, locations: [...state.locations, action.payload] };
    case ADD_MULTIPLE_LOCATIONS:
      if (!action.payload || !action.payload.length) return state;
      const locations = action.payload.filter(location => !existsById(state.locations, location.id));
      return locations.length === 0 ? state : { ...state, locations: [...state.locations, ...locations] };
    case REMOVE_LOCATION:
      if (!existsById(state.locations, action.payload.id)) return state;
      return { ...state, locations: removeById(state.locations, action.payload.id) };
    case REPLACE_LOCATIONS:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
};

export default locationReducer;
