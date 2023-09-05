import {
  getAllRecords,
  getRecordById,
  deleteAllRecords,
  storeInCache,
  isValidCache,
  deleteRecordById,
} from '../index';
const timestamp = (Date.now() * 6000).toString();
describe('Checking Realm Database', () => {
  it('validate Realm delete record by id from cache', async () => {
    const result = await deleteRecordById('key');
    expect(result).toEqual('success');
  });

  it('validate Realm delete all data from cache', async () => {
    const result = await deleteAllRecords('key');
    expect(result).toEqual('success');
  });

  it('validate Realm get all records', async () => {
    const result = await getAllRecords();
    expect(result).toEqual({
      status: 'success',
      message: 'Data retrieved from cache successfully.',
      data: {},
    });
  });
  it('validate Realm create record', async () => {
    const result = await storeInCache(
      'name',
      'My name is secrect',
      timestamp,
    );
    expect(result).toEqual({
      status: 'success',
      message: 'Data stored in cache successfully.',
      data: {
        id: 'name',
        response: 'My name is secrect',
        timestamp: timestamp,
      },
    });
  });

  it('validate Realm update record case', async () => {
    const result = await storeInCache(
      'name',
      'My name is WYSIWYG',
      timestamp,
    );
    expect(result).toEqual({
      status: 'success',
      message: 'Data stored in cache successfully.',
      data: {
        id: 'name',
        response: 'My name is WYSIWYG',
        timestamp: timestamp,
      },
    });
  });

  it('validate Realm get record by id', async () => {
    await getRecordById('name');
  });

  it('validate Realm get record by id error case', async () => {
    const result = await getRecordById(12);
    expect(result).toEqual({
      status: 'failed',
      message: 'Error in fetching data from cache.',
      data: 'An exception has occured while retrieving data from cache',
    });
  });

  it('validate Realm check if valid cache', async () => {
    await isValidCache('name');
  });

  it('validate Realm check if valid cache error case', async () => {
    const res = await isValidCache('names');
    expect(res).toEqual({
      status: 'failed',
      message: 'Data available in cache is invalid.',
      data: null,
    });
  });
  it('validate Realm check if valid cache error case default', async () => {
    const res = await isValidCache(12);
    expect(res).toEqual({
      status: 'failed',
      message: 'Error in validating cache.',
      data: null,
    });
  });
  it('validate Realm check store in mobile cache default error case', async () => {
    const res = await storeInCache(12, 'My name is secrect', timestamp);
    expect(res).toEqual({
      status: 'failed',
      message: 'Error in storing data in cache.',
      data: 'An exception has occured while retrieving data from cache',
    });
  });
  it('validate Realm check delete record by id error case', async () => {
    const res = await deleteRecordById(12);
    expect(res).toEqual('failed');
  });
});
