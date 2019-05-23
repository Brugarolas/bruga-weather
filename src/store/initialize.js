import Actions from './actions/index.js';
import Task from '@/api/utils/task.js';

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
  const updateTask = update.bind(undefined, store, locationStorage);
  const task = new Task(updateTask, 300000); // 5 minutes = 5 * 60 * 1000 ms = 300000 ms

  setTimeout(() => {
    initialize(store, locationStorage);
    task.start();
  });
}
