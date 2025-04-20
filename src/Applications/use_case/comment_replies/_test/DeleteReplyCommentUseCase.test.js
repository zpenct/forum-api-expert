const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const DeleteReplyCommentUseCase = require('../DeleteReplyCommentUseCase');

describe('DeleteReplyCommentUseCase', () => {
  it('[POSITIVE] should orchestrate the flow delete replied comment action', async () => {
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentReplyRepository = new CommentReplyRepository();

    mockThreadRepository.verifyThreadIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentRepository.verifyCommentIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentReplyRepository.verifyReplyCommentIsExist = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentReplyRepository.verifyReplyCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockCommentReplyRepository.deleteReplyCommentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    const deleteReplyCommentUseCase = new DeleteReplyCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockCommentReplyRepository,
    });

    const payload = {
      threadId: 'thread',
      commentId: 'comment',
      id: 'reply',
      owner: 'user-xxx',
    };

    await expect(deleteReplyCommentUseCase.execute(payload))
      .resolves
      .not
      .toThrow();

    expect(mockThreadRepository.verifyThreadIsExist).toBeCalledWith(payload.threadId);
    expect(mockCommentRepository.verifyCommentIsExist).toBeCalledWith(payload.commentId);
    expect(mockCommentReplyRepository.verifyReplyCommentIsExist).toBeCalledWith(payload.id);
    expect(mockCommentReplyRepository.verifyReplyCommentOwner)
      .toBeCalledWith(payload.id, payload.owner);
    expect(mockCommentReplyRepository.deleteReplyCommentById).toBeCalledWith(payload.id);
  });
});