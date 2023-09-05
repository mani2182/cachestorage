import {
    getAllRecords,
    getRecordById,
    deleteAllRecords,
    storeInCache,
    isValidCache,
    deleteRecordById,
  } from '../index';

  jest.mock('idb', () => ({
    openDB: jest.fn(),
}));

  const timestamp = (Date.now() * 6000).toString();

  describe('Checking indexed Database', () => {
    it('validate indexedDB delete record by id from cache', async () => {
      const result = await deleteRecordById('key');
      expect(result).toBeTruthy();
    });

    it('validate indexedDB delete all data from cache', async () => {
      const result = await deleteAllRecords('key');
      expect(result).toBeTruthy();
    });

    it('validate indexedDB get all records', async () => {
      const result = await getAllRecords();
      expect(result).toBeTruthy()
      expect(result.status).toBe('success')
      expect(result.message).toBe("Data retrieved from cache successfully.")
      expect(result.status).toBe('failed')
      expect(result.message).toBe("Error in fetching data from cache.")
    });

    it('validate indexedDB create record', async () => {
      const result = await storeInCache(
        'name',
        'My name is secrect',
        timestamp,
      );
      expect(result).toBeTruthy()
      expect(result.status).toBe('failed')
      expect(result.message).toBe("Error in storing data in cache.")
    });

    it('validate indexedDB get record by id error case', async () => {
      const result = await getRecordById(12);
      expect(result).toBeTruthy()
      expect(result.status).toBe('failed')
      expect(result.message).toBe("Error in fetching data from cache.")
    });

    it('validate indexedDB check if valid cache error case default', async () => {
      const result = await isValidCache(12);
      expect(result).toBeTruthy()
      expect(result.status).toBe('failed')
      expect(result.message).toBe("Error in validating cache.")
    });
  });
