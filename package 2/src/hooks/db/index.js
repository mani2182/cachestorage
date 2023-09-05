import { openDB } from 'idb';

const dbPromise = openDB('CacheStorage', 1, {
  upgrade(db) {
    db.createObjectStore('CacheDB');
  },
});

async function getAllRecords() {
  try {
    const db = await dbPromise;
    const transaction = db.transaction('CacheDB', 'readonly');
    const objectStore = transaction.objectStore('CacheDB');
    const records = await objectStore.getAll();

    return {
      status: 'success',
      message: 'Data retrieved from cache successfully.',
      data: records,
    };
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in fetching data from cache.',
      data: e,
    };
  }
}

async function getRecordById(_id) {
  try {
    const db = await dbPromise;
    const transaction = db.transaction('CacheDB', 'readonly');
    const objectStore = transaction.objectStore('CacheDB');
    const record = await objectStore.get(_id);
    return {
      status: 'success',
      message: 'Data retrieved from cache successfully.',
      data: record,
    };
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in fetching data from cache.',
      data: e,
    };
  }
}

async function storeInCache(_id, _response, _timestamp) {
  try {
    const db = await dbPromise;
    const transaction = db.transaction('CacheDB', 'readwrite');
    const objectStore = transaction.objectStore('CacheDB');
    const data = {
      id: _id,
      response: JSON.stringify(_response),
      timestamp: _timestamp,
    };
    await objectStore.put(data, _id); // Use put with the key parameter
    return {
      status: 'success',
      message: 'Data stored in cache successfully.',
      data: JSON.stringify(_response),
    };
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in storing data in cache.',
      data: e,
    };
  }
}

async function deleteAllRecords() {
  try {
    const db = await dbPromise;
    const transaction = db.transaction('CacheDB', 'readwrite');
    const objectStore = transaction.objectStore('CacheDB');
    await objectStore.clear();
    return 'success';
  } catch (e) {
    return e;
  }
}

async function deleteRecordById(_id) {
  try {
    const db = await dbPromise;
    const transaction = db.transaction('CacheDB', 'readwrite');
    const objectStore = transaction.objectStore('CacheDB');
    await objectStore.delete(_id);
    return 'success';
  } catch (e) {
    return 'failed';
  }
}

async function isValidCache(_id) {
  try {
    const db = await dbPromise;
    const transaction = db.transaction('CacheDB', 'readonly');
    const objectStore = transaction.objectStore('CacheDB');
    const record = await objectStore.get(_id);
    let store;
    try {
      store = JSON.parse(record.response);
    } catch(e) {
      store = record.response;
    }
    if (
      record &&
      record.response &&
      Object.keys(store).length > 0 &&
      record.timestamp &&
      (parseInt(record.timestamp, 10) - Date.now()) / (60 * 1000) >= 0
    ) {
      return {
        status: 'success',
        message: 'Data available in cache is valid.',
        data: record,
      };
    } else {
      return {
        status: 'failed',
        message: 'Data available in cache is invalid.',
        data: null,
      };
    }
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in validating cache.',
      data: e,
    };
  }
}

export {
  getAllRecords,
  getRecordById,
  storeInCache,
  isValidCache,
  deleteAllRecords,
  deleteRecordById,
};
