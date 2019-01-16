import Actions from './actions/index.js';

export default (store, locationStorage) => {
  const locations = locationStorage.getLocations();
  if (locations.length > 0) {
    store.dispatch(Actions.addMultipleLocations(locations));
  }

  const update = () => {
    const locations = locationStorage.getLocations();
    if (locations.length > 0) {
      store.dispatch(Actions.replaceLocations(locations));
    }
    return locations.length;
  }

  setInterval(update, 300000) // 5 * 60 * 1000 ms = 5 minutes
}
