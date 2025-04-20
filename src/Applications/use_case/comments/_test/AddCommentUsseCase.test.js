const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const NewComment = require('../../../../Domains/comments/entities/AddComment');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  
  it('[NEGATIVE] should throw error when use case payload not contain needed properties', async () => {
    const addCommentUseCase = new AddCommentUseCase({});

    await expect(addCommentUseCase.execute({})).rejects.toThrowError('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROERTY');
  });

  it('[NEGATIVE] should throw error when use case payload contain wrong data type', async () => {
    const addCommentUseCase = new AddCommentUseCase({});

    await expect(addCommentUseCase.execute({ content: 1223, threadId: true, owner: [] }))
      .rejects
      .toThrowError('ADD_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE');
  });

  it('[POSITIVE] should execute the add comment use case as expected', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    const useCasePayload = {
      content: 'thread',
      owner: 'user',
      threadId: 'thread-001',
    };

    const expectedResult = new NewComment({
      content: 'thread',
      owner: 'user',
      id: 'comment-001',
    });

    mockThreadRepository.verifyThreadIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedResult));

    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const result = await addCommentUseCase.execute(useCasePayload);

    expect(result).toStrictEqual(expectedResult);
    expect(mockThreadRepository.verifyThreadIsExist).toBeCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.addComment).toBeCalledWith(useCasePayload);
  });

});