//This component is used to store/get the data as key/value pair (encrypted if needed) in Asyncstorage.
import CryptoJS from 'crypto-js';
import {
  storeInCache,
  isValidCache,
  deleteAllRecords,
  deleteRecordById,
} from './db';

export const setCacheStorage = async (
  key: string,
  value: string,
  expiryTime: number,
) => {
  //This function is used to store the value in cache storage.
  const setVal = async (
    k: string, //key
    v: string, //value
    t: number, //timestamp
  ) => {
    //encyption happens based on criteria
    let tempVal = v;
    try {
      const cacheTime = Date.now() + t * 60 * 1000;
      await storeInCache(k, tempVal, cacheTime.toString());
      return {
        status: 'success',
        message: 'Data stored successfully',
      };
    } catch (e) {
      return {
        status: 'failed',
        data: e,
      };
    }
  };

  return setVal(key, value, expiryTime);
};

export const setEncrypytedCacheStorage = async (
  key: string,
  value: string,
  expiryTime: number,
  secretPass: string,
) => {
  //This function is used to store the value in cache storage.
  const setEncryptedVal = async (
    k: string, //key
    v: string, //value
    t: number, //timestamp
    s: string, //secret pass
  ) => {
    //encyption happens based on criteria
    let tempVal = v;
    try {
      tempVal = CryptoJS.AES.encrypt(tempVal, s).toString();
      const cacheTime = Date.now() + t * 60 * 1000;
      await storeInCache(k, tempVal, cacheTime.toString());
      return {
        status: 'success',
        message: 'Data encrypted and stored successfully',
      };
    } catch (e) {
      return {
        status: 'failed',
        data: e,
      };
    }
  };

  return setEncryptedVal(key, value, expiryTime, secretPass);
};

export const getCacheStorage = async (key: string) => {
  //This function is used to get the value from cache storage.
  const getVal = async (
    k: string, //key
  ) => {
    let val;
    try {
      val = await isValidCache(k);
      if (val.status === 'success') {
        return {
          status: 'success',
          message: 'Data fetched successfully',
          data: val.data,
        };
      } else {
        return {
          status: 'failed',
          message: 'Error in fetching data',
          data: val,
        };
      }
    } catch (e) {
      return {
        status: 'failed',
        data: e,
      };
    }
  };

  return getVal(key);
};

export const getEncrypytedCacheStorage = async (
  key: string,
  secretPass: string,
) => {
  //This function is used to get the value from cache storage.
  const getEncryptedVal = async (
    k: string, //key
    s: string, //secret pass
  ) => {
    //decryption happens based on criteria
    let val;
    try {
      val = await isValidCache(k);
      if (val.status === 'success') {
        //decryption happens based on criteria before returning the response
        let res = val.data;
        const response = res[0] && res[0].response ? res[0].response : JSON.parse(res?.response);
        const bytes = CryptoJS.AES.decrypt(response, s);
        res = bytes.toString(CryptoJS.enc.Utf8);
        return {
          status: 'success',
          message: 'Data fetched successfully',
          data: res,
        };
      } else {
        return {
          status: 'failed',
          message: 'Invalid secrect key or no data available.',
          data: '',
        }
      }
    } catch (e) {
      return {
        status: 'failed',
        data: e,
      };
    }
  };

  return getEncryptedVal(key, secretPass);
};

export const deleteCacheStorage = async () => {
  //THis function is used to remove all datas from storage
  const delAll = async () => {
    try {
      const v: any = await deleteAllRecords();
      if (v === 'success') {
        return {
          status: 'success',
          message: 'Cache deleted successfully',
          data: v,
        };
      } else {
        return {
          status: 'failed',
          message: 'Error in deleting cache',
          data: v,
        };
      }
    } catch (e) {
      return {
        status: 'failed',
        data: e,
      };
    }
  };

  return await delAll();
};

export const deleteCacheStorageById = async (id: string) => {
  //THis function is used to remove all datas from storage
  const delById = async (_id: string) => {
    try {
      const v: any = await deleteRecordById(_id);
      if (v === 'success') {
        return {
          status: 'success',
          message: 'Cache deleted successfully',
          data: v,
        };
      } else {
        return {
          status: 'failed',
          message: 'Error in deleting cache',
          data: v,
        };
      }
    } catch (e) {
      return {
        status: 'failed',
        data: e,
      };
    }
  };

  return await delById(id);
};
