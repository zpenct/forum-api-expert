const ToggleLikeCommentUseCase = require('../ToggleLikeCommentUseCase');
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const LikeRepository = require('../../../../Domains/likes/LikeRepository');

describe('ToggleLikeCommentUseCase', () => {
  it('should orchestrate the toggle like comment action correctly', async () => {
    const payload = {
      userId: 'user-123',
      threadId: 'thread-123',
      commentId: 'comment-234',
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.verifyThreadIsExist = jest.fn()
      .mockResolvedValue();
    mockCommentRepository.verifyCommentIsExist = jest.fn()
      .mockResolvedValue();
    mockLikeRepository.setCommentLikes = jest.fn()
      .mockResolvedValue();

    const toggleLikeCommentUseCase = new ToggleLikeCommentUseCase({
      likeRepository: mockLikeRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    await toggleLikeCommentUseCase.execute(payload);

    expect(mockThreadRepository.verifyThreadIsExist)
      .toBeCalledWith(payload.threadId);

    expect(mockCommentRepository.verifyCommentIsExist)
      .toBeCalledWith(payload.commentId);

    expect(mockLikeRepository.setCommentLikes)
      .toBeCalledWith(payload.userId, payload.commentId);
  });

  it('should throw error when payload is missing required properties', async () => {
    const toggleLikeCommentUseCase = new ToggleLikeCommentUseCase({
      likeRepository: {},
      threadRepository: {},
      commentRepository: {},
    });

    await expect(toggleLikeCommentUseCase.execute({}))
      .rejects.toThrowError('TOGGLE_LIKE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
