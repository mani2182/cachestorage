import {
    setCacheStorage,
    setEncrypytedCacheStorage,
    getCacheStorage,
    getEncrypytedCacheStorage,
    deleteCacheStorage,
    deleteCacheStorageById,
} from '../index';
import * as indexedDbModule from '../hooks/db';
import CryptoJS from 'crypto-js';

// Mock the CryptoJS library
jest.mock('crypto-js', () => ({
    AES: {
        encrypt: jest.fn((value, secret) => ({ toString: () => value })),
        decrypt: jest.fn((value, secret) => ({ toString: () => value })),
    },
}));

// Mock IndexedDB module
jest.mock('../hooks/db', () => ({
    storeInCache: jest.fn(),
    deleteAllRecords: jest.fn(),
    isValidCache: jest.fn(),
    deleteRecordById: jest.fn(),
    getAllRecords: jest.fn(),
    getRecordById: jest.fn()
}));

describe('Cache Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should store data in cache', async () => {
        (indexedDbModule.storeInCache as jest.Mock).mockResolvedValueOnce({
          status: 'success',
          message: 'Data stored successfully',
        });

        const key = 'myKey';
        const value = 'myValue';
        const expiryTime = 60;
        const result = await setCacheStorage(key, value, expiryTime);

        expect(indexedDbModule.storeInCache).toHaveBeenCalledWith(key, value, expect.any(String));
        expect(result.status).toBe('success');
        expect(result.message).toBe('Data stored successfully');
      });

      it('should store encrypted data in cache', async () => {
        (CryptoJS.AES.encrypt as jest.Mock).mockReturnValueOnce({
          toString: () => 'encryptedData',
        });

        (indexedDbModule.storeInCache as jest.Mock).mockResolvedValueOnce({
          status: 'success',
          message: 'Data encrypted and stored successfully',
        });
        const key = 'myKey';
        const value = 'myValue';
        const expiryTime = 60;
        const secretPass = 'mySecret';
        const result = await setEncrypytedCacheStorage(key, value, expiryTime, secretPass);

        expect(CryptoJS.AES.encrypt).toHaveBeenCalledWith(value, secretPass);
        expect(indexedDbModule.storeInCache).toHaveBeenCalledWith(key, 'encryptedData', expect.any(String));
        expect(result.status).toBe('success');
        expect(result.message).toBe('Data encrypted and stored successfully');
      });

      it('should retrieve data from cache', async () => {
        (indexedDbModule.isValidCache as jest.Mock).mockResolvedValueOnce({
          status: 'success',
          data: [{ response: 'myValue' }],
        });
        const key = 'myKey';
        const result = await getCacheStorage(key);

        expect(indexedDbModule.isValidCache).toHaveBeenCalledWith(key);
        expect(result.status).toBe('success');
        expect(result.message).toBe('Data fetched successfully');
        expect(result.data).toEqual(['myValue']);
      });

      it('should retrieve and decrypt data from cache', async () => {
        (indexedDbModule.isValidCache as jest.Mock).mockResolvedValueOnce({
          status: 'success',
          data: [{ response: 'encryptedData' }],
        });
        (CryptoJS.AES.decrypt as jest.Mock).mockReturnValueOnce({ toString: () => 'decryptedData' });
        const key = 'myKey';
        const secretPass = 'mySecret';
        const result = await getEncrypytedCacheStorage(key, secretPass);

        expect(indexedDbModule.isValidCache).toHaveBeenCalledWith(key);
        expect(result.status).toBe('success');
        expect(result.message).toBe('Data fetched successfully');
        expect(result.data).toBe('decryptedData');
      });

      it('should delete all data from cache', async () => {
        (indexedDbModule.deleteAllRecords as jest.Mock).mockResolvedValueOnce('success');
        const result = await deleteCacheStorage();

        expect(indexedDbModule.deleteAllRecords).toHaveBeenCalled();
        expect(result.status).toBe('success');
        expect(result.message).toBe('Cache deleted successfully');
      });

      it('should delete data by ID from cache', async () => {
        (indexedDbModule.deleteRecordById as jest.Mock).mockResolvedValueOnce('success');
        const id = 'myId';
        const result = await deleteCacheStorageById(id);

        expect(indexedDbModule.deleteRecordById).toHaveBeenCalledWith(id);
        expect(result.status).toBe('success');
        expect(result.message).toBe('Cache deleted successfully');
      });
    });