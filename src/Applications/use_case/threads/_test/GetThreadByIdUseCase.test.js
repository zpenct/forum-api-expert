const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const Comment = require('../../../../Domains/comments/entities/CommentDetail');
const CommentReplyRepository = require('../../../../Domains/comment_replies/CommentReplyRepository');
const CommentReply = require('../../../../Domains/comment_replies/entities/CommentReply');
const Thread = require('../../../../Domains/threads/entities/ThreadDetail');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const GetThreadByIdUseCase = require('../GetDetailThreadUseCase');

describe('GetThreadByIdUseCase', () => {
  it('[POSITIVE] should return thread detail with comments and replies as expected', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentReplyRepository = new CommentReplyRepository();
  
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
        replies: [],
      }),
    ];
  
    const replies = [
      {
        username: 'user3',
        id: 'reply-001',
        comment_id: 'comment-001',
        is_delete: false,
        created_at: dateReply,
        owner: 'user3',
        content: 'reply comment',
      },
    ];
  
    mockCommentRepository.getCommentsByThreadId = jest.fn().mockResolvedValue(comments);
    mockCommentReplyRepository.findRepliesByCommentIds = jest.fn().mockResolvedValue(replies);
  
    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentReplyRepository: mockCommentReplyRepository,
    });
  
    const payload = { threadId: 'thread-001' };
  
    const result = await getThreadByIdUseCase.execute(payload);
  
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
    expect(comment.replies).toHaveLength(1);
  
    const reply = comment.replies[0];
    expect(reply.id).toEqual('reply-001');
    expect(reply.content).toEqual('reply comment');
    expect(reply.username).toEqual('user3');
    expect(reply.date).toEqual(dateReply);
    expect(reply.is_delete).toBe(false);
  
    // ✅ Verification of call
    expect(mockThreadRepository.getThreadById).toBeCalledWith(payload.threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(payload.threadId);
    expect(mockCommentReplyRepository.findRepliesByCommentIds)
      .toBeCalledWith(['comment-001']);
  });
  

  it('should throw error when use case payload not contain needed properties', async () => {
    const getThreadByIdUseCase = new GetThreadByIdUseCase({});

    await expect(getThreadByIdUseCase.execute({}))
      .rejects
      .toThrow('GET_THREAD_BY_ID_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('[POSITIVE] should return empty replies when comment has no replies', async () => {
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockCommentReplyRepository = new CommentReplyRepository();
  
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
        replies: [],
      }),
    ];
  
    // 💡 Replies tidak mengandung comment-001, artinya comment ini tidak punya balasan
    const replies = [];
  
    mockThreadRepository.getThreadById = jest.fn(() => Promise.resolve(thread));
    mockCommentRepository.getCommentsByThreadId = jest.fn(() => Promise.resolve(comments));
    mockCommentReplyRepository.findRepliesByCommentIds = jest.fn(() => Promise.resolve(replies));
  
    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentReplyRepository: mockCommentReplyRepository,
    });
  
    const result = await getThreadByIdUseCase.execute({ threadId: 'thread-001' });
  
    expect(result.comments[0].replies).toEqual([]);
  });
  

});