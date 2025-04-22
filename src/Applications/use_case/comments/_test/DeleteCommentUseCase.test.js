const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const AuthorizationError = require('../../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');

describe('DeleteCommentUseCase', () => {
  
  it('[POSITIVE] should execute comment deletion through proper use case flow', async () => {
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
  
    mockCommentRepository.verifyCommentOwner = jest.fn(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest.fn(() => Promise.resolve());
    mockThreadRepository.verifyThreadIsExist = jest.fn(() => Promise.resolve());
  
    const useCasePayload = {
      threadId: 'thread',
      commentId: 'comment',
      owner: 'user-123',
    };
  
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });
  
    // ✅ Explicitly asserting no specific errors are thrown
    await expect(deleteCommentUseCase.execute(useCasePayload)).resolves.not.toThrow(AuthorizationError);
    await expect(deleteCommentUseCase.execute(useCasePayload)).resolves.not.toThrow(NotFoundError);
  
    // ✅ Verifying all orchestrated calls are done
    expect(mockThreadRepository.verifyThreadIsExist).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(
      useCasePayload.commentId,
      useCasePayload.owner,
    );
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(useCasePayload.commentId);
  });
  
});