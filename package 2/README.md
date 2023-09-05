## <ins>ReactNative | React Js Cache</ins>

### About the component
This component can be used to store data (encrypted with secrect key) as key/value pair.

Import the Component

```ts
import {
  getCacheStorage,
  getEncrypytedCacheStorage,
  setCacheStorage,
  setEncrypytedCacheStorage,
  deleteCacheStorage,
  deleteCacheStorageById,
} from "../CacheStorage/index";
```

### Call below function to get the data from cache.

```ts
getCacheStorage('key')
```

### Call below function to get the encrypted data from cache.

```ts
getEncrypytedCacheStorage('key', 'secretPass')
```

### Call below function when data to be stored / retrieved from cache.

```ts
setCacheStorage('key','value','expiryTime')
```

### Call below function when data to be stored and encrypted from cache.

```ts
setEncrypytedCacheStorage('key','value','expiryTime','secretPass')
```

### Call below function to clear the data from cache.

```ts
deleteCacheStorage()
```

### Call below function to clear the data from cache using key.

```ts
deleteCacheStorageById('key')
```

### Properties
Property | Type | Description
--- | --- | ---
key | string | This holds the data.
expiryTime | number | required when you want to store data. Value must be number represent how many minutes data to be cached.
value | string | required when we SET data.
secrectPass | string | required when we need to store or retrieve encrypted data.
---

# <ins>Component Specifications</ins>
Following specifications are useful to the developer who are going to work in this component.

## iOS:
When the package is installed then we need to install the pods for ios development.

``` pod install ```

### Interface for the props

```ts
interface {
  key: string,
  expiryTime?: number,
  value?: string,
  secretPass?: string,
}
```

### Unit Test Cases
- Check is it functioning successfully.