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

    const thread = new Thread({
      id: 'thread-001',
      username: 'user',
      date: new Date(),
      title: 'thread',
      body: 'body thread',
    });

    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(thread));

    const comments = [
      new Comment({
        id: 'comment-001',
        content: 'comment',
        username: 'user2',
        date: new Date(),
        is_delete: false,
        replies: [],
      }),
    ];

    const replies = [{
      username: 'user3',
      id: 'reply-001',
      comment_id: 'comment-001',
      is_delete: false,
      created_at: new Date(),
      owner: 'user3',
      content: 'reply comment',
    }];

    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(comments));

    mockCommentReplyRepository.findRepliesByCommentIds = jest.fn()
      .mockImplementation(() => Promise.resolve(replies));

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      commentReplyRepository: mockCommentReplyRepository,
    });

    const payload = {
      threadId: 'thread-001',
    };

    const threadDetail = await getThreadByIdUseCase.execute(payload);

    const expectedThread = {
      ...thread,
      comments: comments.map((comment) => {
        const repliesComment = replies.filter((reply) => reply.comment_id === comment.id);
        return {
          ...comment,
          replies: repliesComment.map(
            (reply) => new CommentReply({ ...reply, date: reply.created_at }),
          ),
        };
      }),
    };

    expect(threadDetail).toStrictEqual(expectedThread);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(payload.threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      payload.threadId,
    );
    expect(mockCommentReplyRepository.findRepliesByCommentIds)
      .toBeCalledWith(comments.map((comment) => comment.id));
  });

  it('should throw error when use case payload not contain needed properties', async () => {
    const getThreadByIdUseCase = new GetThreadByIdUseCase({});

    await expect(getThreadByIdUseCase.execute({}))
      .rejects
      .toThrow('GET_THREAD_BY_ID_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
  });

});