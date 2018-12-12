import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, REMOVE_LOCATION } = actionTypes;

const initialState = {
  locations: []
};

const idExists = (store, id) => {
  return !!store.find(element => element.id === id);
}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      if (idExists(state.locations, action.payload.id)) return state;
      return { ...state, locations: [...state.locations, action.payload] };
    default:
      return state;
  }
};

export default locationReducer;
