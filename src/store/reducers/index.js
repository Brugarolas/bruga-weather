import actionTypes from "../constants/action-types.js";
const { ADD_LOCATION, REMOVE_LOCATION } = actionTypes;

const initialState = {
  locations: []
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };
    default:
      return state;
  }
};

export default locationReducer;
