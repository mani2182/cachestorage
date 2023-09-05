/* This component file is used (as cache) to store / retrieve / update / delete the data
that comes from different component. We use realm database for to store data. */
import Realm from 'realm';

// Component schema
class CacheStore extends Realm.Object {}
CacheStore.schema = {
  name: 'CacheDB',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', indexed: true},
    response: 'string',
    timestamp: 'string',
  },
};

// Create realm
const realm = new Realm({
  schema: [CacheStore],
  schemaVersion: 4,
});
// console.log('REALM PATH', Realm.defaultPath);
// Get all records
const getAllRecords = () => {
  try {
    return {
      status: 'success',
      message: 'Data retrieved from cache successfully.',
      data: realm.objects('CacheDB'),
    };
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in fetching data from cache.',
      data: e,
    };
  }
};

//If data already exists then do update data else create a new record.
const storeInCache = (_id, _response, _timestamp) => {
  try {
    const updt = realm.objects('CacheDB').filtered('id = $0', _id);
    if (updt && Object.keys(updt).length > 0 && updt[0] && updt[0].response) {
      realm.write(() => {
        updt[0].response = _response;
      });
      realm.write(() => {
        updt[0].timestamp = _timestamp;
      });
    } else {
      realm.write(() => {
        realm.create('CacheDB', {
          id: _id,
          response: _response,
          timestamp: _timestamp,
        });
      });
    }
    return {
      status: 'success',
      message: 'Data stored in cache successfully.',
      data: {
        id: _id,
        response: _response,
        timestamp: _timestamp,
      },
    };
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in storing data in cache.',
      data: 'An exception has occured while retrieving data from cache',
    };
  }
};

// Remove all components data from Realm database
const deleteAllRecords = () => {
  try {
    realm.write(() => {
      realm.delete(realm.objects('CacheDB'));
    });
    return 'success';
  } catch (e) {
    return e;
  }
};

// Remove data by id from Realm database
const deleteRecordById = _id => {
  try {
    realm.write(() => {
      realm.delete(realm.objects('CacheDB').filtered('id = $0', _id));
    });
    return 'success';
  } catch (e) {
    return 'failed';
  }
};

// Get component by id
const getRecordById = _id => {
  try {
    const result = realm.objects('CacheDB').filtered('id = $0', _id);
    return {
      status: 'success',
      message: 'Data retrieved from cache successfully.',
      data: result,
    };
  } catch (e) {
    return {
      status: 'failed',
      message: 'Error in fetching data from cache.',
      data: 'An exception has occured while retrieving data from cache',
    };
  }
};

// Check Cache for record
const isValidCache = _id => {
  try {
    const record = realm.objects('CacheDB').filtered('id = $0', _id);
    if (
      record &&
      Object.keys(record).length > 0 &&
      record[0] &&
      record[0].timestamp &&
      (parseInt(record[0].timestamp, 10) - Date.now()) / (60 * 1000) >= 0
    ) {
      // Cache is valid
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
      data: null,
    };
  }
};

// Export the realm so other files can access it
export default realm;

// Export other functions so other files can access it
export {
  getAllRecords,
  getRecordById,
  deleteAllRecords,
  storeInCache,
  isValidCache,
  deleteRecordById,
};
