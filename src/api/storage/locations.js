class LocationStorage {
  constructor() {
    this.storage = window.localStorage;
    this.initialized = false;
    this.locations = [];
  }

  initialize () {
    if (this.initialized) return;
    this.initialized = true;

    let locations = this.storage.getItem('locations');
    this.locations = locations ? locations.split(',').map(Number) : [] || [];
  }

  getLocations () {
    return this.locations;
  }

  save () {
    if (this.locations.length === 0) {
      this.storage.removeItem('locations');
    } else {
      this.storage.setItem('locations', this.locations.join(','));
    }
  }

  addLocation (location) {
    let index = this.locations.indexOf(location.id);
    if (index !== -1) return;

    this.locations.push(location.id);
    this.save();
  }

  removeLocation (location) {
    let index = this.locations.indexOf(location.id);
    if (index === -1) return;

    this.locations.splice(index, 1);
    this.save();
  }
}

export default LocationStorage;
