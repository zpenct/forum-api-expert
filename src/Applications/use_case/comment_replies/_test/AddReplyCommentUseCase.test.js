const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const NewComment = require('../../../../Domains/comments/entities/AddComment');
const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddReplyCommentUseCase = require('../AddReplyCommentUseCase');

describe('AddReplyCommentUseCase', () => {
  it('should throw error when payload contain wrong data type', async () => {
    const payload = {
      threadId: {},
      commentId: [],
      owner: true,
      content: false,
    };

    const addReplyCommentUseCase = new AddReplyCommentUseCase({});

    await expect(() => addReplyCommentUseCase.execute(payload))
      .rejects
      .toThrowError('ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE');
  });
  it('[NEGATIVE] should throw error when payload not contain needed property', async () => {
    const payload = {
      threadId: 'thread-000',
      commentId: 'comment-000',
      owner: '',
    };

    const addReplyCommentUseCase = new AddReplyCommentUseCase({});

    await expect(() => addReplyCommentUseCase.execute(payload))
      .rejects
      .toThrowError('ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('[NEGATIVE] should throw error when content is empty', async () => {
    const payload = {
      threadId: 'threadio',
      commentId: 'comment',
      owner: 'user',
      content: '',
    };

    const addReplyCommentUseCase = new AddReplyCommentUseCase({});

    await expect(() => addReplyCommentUseCase.execute(payload))
      .rejects
      .toThrowError('ADD_REPLY_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING');
  });

  it('[POSTIVE] should add the reply comment correctly', async () => {
    const mockCommentReplyRepository = new CommentReplyRepository();
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    const expectedResult = new NewComment({
      id: 'reply-0001',
      content: 'reply',
      owner: 'user-0001',
    });

    mockCommentReplyRepository.addReplyComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedResult));

    mockCommentRepository.verifyCommentIsExist = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.verifyThreadIsExist = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const addReplyCommentUseCase = new AddReplyCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
      replyRepository: mockCommentReplyRepository,
    });

    const useCasePayload = {
      content: 'reply',
      owner: 'user-0001',
      commentId: 'comment-0001',
      threadId: 'thread-0001',
    };

    const result = await addReplyCommentUseCase.execute(useCasePayload);

    expect(result).toStrictEqual(expectedResult);
    expect(mockThreadRepository.verifyThreadIsExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentIsExist).toBeCalledWith(useCasePayload.commentId);
    expect(mockCommentReplyRepository.addReplyComment).toBeCalledWith(useCasePayload);
  });
});