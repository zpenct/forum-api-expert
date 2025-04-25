const NewThread = require('../../../../Domains/threads/entities/AddThread');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
 

  it('[NEGATIVE] should throw error when payload contain wrong data type', async () => {
    const badPayload = {
      owner: true,
      title: {},
      body: [],
    };

    const addThreadUseCase = new AddThreadUseCase({});
    await expect(addThreadUseCase.execute(badPayload)).rejects.toThrowError(
      'ADD_THREAD_USE_CASE.PROPERTY_HAVE_WRONG_DATA_TYPE',
    );
  });

  it('[NEGATIVE] should throw error when payload not contain needed property', async () => {
    const addThreadUseCase = new AddThreadUseCase({});

    await expect(addThreadUseCase.execute({})).rejects.toThrowError(
      'ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('[POSITIVE] should execute add thread use case as expected', async () => {
    const useCasePayload = {
      title: 'Forum Thread',
      body: 'body',
      owner: 'user-123',
    };
  
    // expected value (untuk assert)
    const expectedNewThread = new NewThread({
      id: 'thread-123',
      title: 'Forum Thread',
      owner: 'user-123',
      body: 'body',
    });
  
    // return object (object baru!)
    const returnFromMock = new NewThread({
      id: 'thread-123',
      title: 'Forum Thread',
      owner: 'user-123',
      body: 'body',
    });
  
    const mockThreadRepository = new ThreadRepository();
    mockThreadRepository.addThread = jest
      .fn()
      .mockResolvedValue(returnFromMock); // beda object dari expected
  
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
  
    const actualThread = await addThreadUseCase.execute(useCasePayload);
  
    expect(actualThread).toEqual(expectedNewThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
  
});