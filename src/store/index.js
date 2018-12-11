import { createStore } from "redux";
import locationReducer from "./reducers/index";

const store = createStore(locationReducer);

export default store;
