import Actions from './actions/index.js';

function initialize (store, locationStorage) {
  locationStorage.initialize();
  const locations = locationStorage.getLocations();
  if (locations.length > 0) {
    store.dispatch(Actions.addMultipleLocations(locations));
  }
  return locations.length;
}

function update (store, locationStorage) {
  const locations = locationStorage.getLocations();
  if (locations.length > 0) {
    store.dispatch(Actions.replaceLocations(locations));
  }
  return locations.length;
}

export default (store, locationStorage) => {
  setTimeout(initialize.bind(undefined, store, locationStorage));

  setInterval(update.bind(undefined, store, locationStorage), 300000) // 5 * 60 * 1000 ms = 5 minutes
}
