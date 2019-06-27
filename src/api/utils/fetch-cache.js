import fetch from '@/api/utils/fetch.js';

/* Variables */
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const transaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
const keyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
const databaseSupport = Boolean(indexedDB && transaction && keyRange);

let fetchDatabase;

/* Database functions */
const openDatabasePromise = () => {
  return new Promise((resolve, reject) => {
    if (!databaseSupport) {
      reject();
    }

    const request = indexedDB.open('localFetchCache', 1);

    request.onsuccess = function(event) {
      const database = event.target.result;
      resolve(database);
    };

    request.onerror = (event) => {
      databaseSupport = false;
      reject();
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      const store = database.createObjectStore('requests', { keyPath: 'url', autoIncrement: false });
      store.createIndex('request_url_id', 'url', { unique: true });
    };
  });
};

const openTransaction = (database, mode) => {
  const transaction = database.transaction('requests', mode);
  return transaction.objectStore('requests');
};

const openDatabase = async () => {
  const database = await openDatabasePromise();

  if (!databaseSupport || !database) {
    return { support: false };
  }

  return {
    read: (url) => new Promise((resolve, reject) => {
      const store = openTransaction(database, 'readonly');

      store.get(url).onsuccess = (event) => {
        resolve(event.target.result);
      };
    }),
    write: (item, overwrite = false) => new Promise((resolve, reject) => {
      const store = openTransaction(database, 'readwrite');
      const operation = overwrite ? store.put(item) : store.add(item);

      operation.onsuccess = (event) => { resolve(true); };
      operation.onerror = (event) => { reject(false); };
    }),
    support: true
  };
};

const getDatabase = async () => {
  if (!fetchDatabase) {
    fetchDatabase = await openDatabase();
  }
  return fetchDatabase;
};

/* Aux functions */
const cacheIsValid = (cache, options) => {
  if (options.localCache === true) {
    return true;
  }

  const now = Date.now();

  return now - cache.time <= options.localCache;
};

const cacheResponse = (json) => {
  return { json: () => json }
};

/* Main function */
const fetchCache = async (url, options) => {
  if (!options || !options.localCache) {
    return await fetch(url, options);
  }

  const database = await getDatabase();

  if (!database.support) {
    return await fetch(url, options);
  }

  const cache = await database.read(url);

  if (cache && cacheIsValid(cache, options)) {
    return cacheResponse(cache.response);
  } else {
    const response = await fetch(url, options);
    const json = await response.json();

    setTimeout(async () => {
      database.write({ url, response: json, time: Date.now() }, true);
    }, 50);

    return cacheResponse(json);
  }
}

export default fetchCache;
