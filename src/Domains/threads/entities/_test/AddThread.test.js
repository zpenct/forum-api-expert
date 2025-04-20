const NewThread = require('../AddThread');

describe('NewThread', () => {
  it('should throw error when payload not contain property needed', () => {
    const payload = {
      title: 'thread',
      id: 'thread-123',
    };

    expect(() => new NewThread(payload)).toThrowError('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      title: 123,
      body: {},
    };

    expect(() => new NewThread(payload)).toThrowError('ADD_THREAD_USE_CASE.PROPERTY_HAVE_WRONG_DATA_TYPE');
  });

  it('should created NewThread entity correctly', () => {
    const payload = {
      title: 'thread a',
      owner: 'user-123',
      id: 'thread-123',
      body: 'thread body',
    };

    const newThread = new NewThread(payload);

    expect(newThread).toBeInstanceOf(NewThread);
    expect(newThread.id).toEqual(payload.id);
    expect(newThread.title).toEqual(payload.title);
    expect(newThread.body).toEqual(payload.body);
    expect(newThread.owner).toEqual(payload.owner);
  });
});