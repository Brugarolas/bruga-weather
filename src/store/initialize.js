import Actions from './actions/index.js';

export default (store, locationStorage) => {
  const locations = locationStorage.getLocations();
  if (locations.length > 0) {
    store.dispatch(Actions.addMultipleLocations(locations));
  }
}
