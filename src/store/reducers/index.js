import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, REMOVE_LOCATION } = actionTypes;

const initialState = {
  locations: []
};

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
    case REMOVE_LOCATION:
      if (!existsById(state.locations, action.payload)) return state;
      return { ...state, locations: removeById(state.locations, action.payload) };
    default:
      return state;
  }
};

export default locationReducer;
