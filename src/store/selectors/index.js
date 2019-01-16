import { createSelector } from 'reselect';

// Utils
const getId = (state, id) => id;

//Selectors
export const getLocations = state => state.locations;

export const getLocationsIds = createSelector(
  getLocations,
  locations => locations.filter(location => !location.hidden).map(location => location.id)
);

export const getLocationById = createSelector(
  [getLocations, getId],
  (locations, id) => locations.find(location => location.id === id)
);

export const hasLocationById = createSelector(
  [getLocationById],
  (location) => !!location
)

export default { getLocations, getLocationsIds, getLocationById };
