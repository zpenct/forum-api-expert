const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const Comment = require('../../../../Domains/comments/entities/CommentDetail');
const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');
const CommentReply = require('../../../../Domains/comment_replies/entities/CommentReply');
const Thread = require('../../../../Domains/threads/entities/ThreadDetail');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const LikeRepository = require('../../../../Domains/likes/LikeRepository');
const GetThreadByIdUseCase = require('../GetDetailThreadUseCase');

describe('GetThreadByIdUseCase', () => {
  it('[POSITIVE] should return thread detail with comments, replies, and likeCount', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new CommentReplyRepository();
    const mockLikeRepository = new LikeRepository();

    const dateThread = new Date();
    const dateComment = new Date();
    const dateReply = new Date();

    mockThreadRepository.getThreadById = jest.fn().mockResolvedValue(
      new Thread({
        id: 'thread-001',
        username: 'user',
        date: dateThread,
        title: 'thread',
        body: 'body thread',
      })
    );

    const comments = [
      new Comment({
        id: 'comment-001',
        content: 'comment',
        username: 'user2',
        created_at: dateComment,
        is_delete: false,
      }),
    ];

    const replies = [
      {
        id: 'reply-001',
        content: 'reply comment',
        username: 'user3',
        created_at: dateReply,
        is_delete: false,
        comment_id: 'comment-001',
      },
    ];

    mockCommentRepository.getCommentsByThreadId = jest.fn().mockResolvedValue(comments);
    mockReplyRepository.findRepliesByCommentIds = jest.fn().mockResolvedValue(replies);

    // Simulasikan likeCount 5 untuk comment-001
    mockLikeRepository.countCommentLikes = jest.fn().mockResolvedValue([
      { comment_id: 'comment-001', count: 5 },
    ]);

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentReplyRepository: mockReplyRepository,
      likeRepository: mockLikeRepository,
    });

    const result = await getThreadByIdUseCase.execute({ threadId: 'thread-001' });

    expect(result.id).toEqual('thread-001');
    expect(result.title).toEqual('thread');
    expect(result.body).toEqual('body thread');
    expect(result.username).toEqual('user');
    expect(result.date).toEqual(dateThread);

    expect(result.comments).toHaveLength(1);
    const comment = result.comments[0];
    expect(comment.id).toEqual('comment-001');
    expect(comment.content).toEqual('comment');
    expect(comment.username).toEqual('user2');
    expect(comment.date).toEqual(dateComment);
    expect(comment.likeCount).toEqual(5); // ✅ tambahan ini
    expect(comment.replies).toHaveLength(1);

    const reply = comment.replies[0];
    expect(reply.id).toEqual('reply-001');
    expect(reply.content).toEqual('reply comment');
    expect(reply.username).toEqual('user3');
    expect(reply.date).toEqual(dateReply);

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-001');
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith('thread-001');
    expect(mockReplyRepository.findRepliesByCommentIds).toBeCalledWith(['comment-001']);
    expect(mockLikeRepository.countCommentLikes).toBeCalledWith(['comment-001']);
  });

  it('should throw error when threadId is missing', async () => {
    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: {}, commentRepository: {}, commentReplyRepository: {}, likeRepository: {}
    });

    await expect(getThreadByIdUseCase.execute({}))
      .rejects.toThrow('GET_THREAD_BY_ID_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should return empty replies and likeCount = 0 when comment has no replies or likes', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new CommentReplyRepository();
    const mockLikeRepository = new LikeRepository();

    const thread = new Thread({
      id: 'thread-001',
      username: 'user',
      date: new Date(),
      title: 'thread',
      body: 'body thread',
    });

    const comments = [
      new Comment({
        id: 'comment-001',
        content: 'comment',
        username: 'user2',
        created_at: new Date(),
        is_delete: false,
      }),
    ];

    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(thread));
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(comments));
    mockReplyRepository.findRepliesByCommentIds = jest.fn(() => Promise.resolve([]));
    mockLikeRepository.countCommentLikes = jest.fn(() => Promise.resolve([]));

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentReplyRepository: mockReplyRepository,
      likeRepository: mockLikeRepository,
    });

    const result = await getThreadByIdUseCase.execute({ threadId: 'thread-001' });

    expect(result.comments[0].replies).toEqual([]);
    expect(result.comments[0].likeCount).toEqual(0);
  });
});
