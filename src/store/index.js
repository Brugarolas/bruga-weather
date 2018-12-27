import { createStore, applyMiddleware  } from 'redux';
import locationReducer from './reducers/index.js';
import searchWeather from './middleware/openweather.js';
import createStorageMiddleware from './middleware/locationStorage.js';
import LocationStorage from '@/api/storage/locations.js';
import initialize from './initialize.js';

const storage = new LocationStorage();
const storageMiddleware = createStorageMiddleware(storage);

const initialState = {
  locations: []
};

const store = createStore(locationReducer, initialState, applyMiddleware(searchWeather, storageMiddleware));

initialize(store, storage);

export default store;
