## <ins>Indexed Database (Cache)</ins>

### About the component
This component can be used to store data (encrypted with secrect key) as key/value pair.

Import the Component

```js
import {
  storeInCache,
  isValidCache,
  deleteAllRecords,
  deleteRecordById,
} from './db/index.js';
```

Call below functions when data to be stored / retrieved from cache.

### Get all records from cache
```js
getAllRecords()
```

### Get one record using key
```js
getRecordById(id)
```

### Delete all records from cache
```js
deleteRecordById(id)
```

### Delete all records from cache
```js
deleteAllRecords()
```

### If data already exists by passing the key/value with timestamp this function manages whether to update value and timestamp for exiting key or create new record.
```ts
storeInCache(id, response, timestamp)
```

### This function checks whether data available in cache for given key and also the expiry time. If its valid cache then response is returned.
```ts
isValidCache(id)
```

### Properties
Property | Type | Description
--- | --- | ---
id | string | Key that holds the value.
response | string | Value to be stored.
timestamp | string | timestamp value for the expiry time of data.

---


# <ins>Component Specifications</ins>
Following specifications are useful to the developer who are going to work in this component.


### Unit Test Cases
- Check is it functioning successfully.

### In your test setup (commonly in a setupTests.js/ts file), set up the polyfill for indexedDB:
import 'fake-indexeddb/auto'; // This imports the polyfill and sets up indexedDB for your tests

### Make sure your test environment is using the jsdom environment, which is a browser-like environment for testing with Jest. This should be configured in your jest.config.js or package.json:
{
  "testEnvironment": "jsdom"
}

## <ins>Realm Database (Cache)</ins>

### About the component
This component can be used to store data (encrypted with secrect key) as key/value pair.

Import the Component

```ts
import {
  storeInCache,
  isValidCache,
  deleteAllRecords,
  deleteRecordById,
} from './db/index.native.js';
```

Call below functions when data to be stored / retrieved from cache.

### Get all records from cache
```js
getAllRecords()
```

### Get one record using key
```js
getRecordById(id)
```

### Delete all records from cache
```js
deleteRecordById(id)
```

### Delete all records from cache
```js
deleteAllRecords()
```

### If data already exists by passing the key/value with timestamp this function manages whether to update value and timestamp for exiting key or create new record.
```js
storeInCache(id, response, timestamp)
```

### This function checks whether data available in cache for given key and also the expiry time. If its valid cache then response is returned.
```js
isValidCache(id)
```

### Properties
Property | Type | Description
--- | --- | ---
id | string | Key that holds the value.
response | string | Value to be stored.
timestamp | string | timestamp value for the expiry time of data.

---


# <ins>Component Specifications</ins>
Following specifications are useful to the developer who are going to work in this component.

## iOS:
When the package is installed then we need to install the pods for ios development.

``` pod install ```

### Unit Test Cases
- Check is it functioning successfully.