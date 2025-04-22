const CommentReply = require('../CommentReply');

describe('Comment entity', () => {
  it('should throw eror when payload not contain needed property', () => {
    const payload = {
      id: 'comment-123',
      content: 'content comentar',
      // need username property,
      // need is_delete property
    };
    expect(() => new CommentReply(payload)).toThrowError(
      'COMMENT_ENTITY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      id: false,
      content: [],
      username: {},
      is_delete: () => ({}),
      created_at: {},
    };

    expect(() => new CommentReply(payload)).toThrowError(
      'COMMENT_ENTITY.PROPERTY_HAVE_WRONG_DATA_TYPE',
    );
  });

  it('should create Comment entity correctly', () => {
    const payload = {
      id: 'comment-123',
      content: 'semua benar',
      username: 'user-123',
      is_delete: false,
      created_at: new Date(),
    };

    const comment = new CommentReply(payload);

    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.username).toEqual(payload.username);
    expect(comment.is_delete).toEqual(payload.is_delete);
    expect(comment.created_at).toEqual(payload.created_at);
  });

  it('if is_delete payload is true, content property should give "**komentar telah dihapus**" as a value', () => {
    const payload = {
      is_delete: true,
      content: 'example comment',
      id: 'comment-123',
      username: 'user-123',
      created_at: new Date(),
    };

    const comment = new CommentReply(payload);

    expect(comment.content).toEqual('**balasan telah dihapus**');
  });  

  it('should group replies by comment_id correctly', () => {
    const replies = [
      {
        id: 'reply-1',
        content: 'reply 1',
        comment_id: 'comment-1',
        created_at: new Date(),
        is_delete: false,
        username: 'userA'
      },
      {
        id: 'reply-2',
        content: 'reply 2',
        comment_id: 'comment-1',
        created_at: new Date(),
        is_delete: false,
        username: 'userB'
      },
      {
        id: 'reply-3',
        content: 'reply 3',
        comment_id: 'comment-2',
        created_at: new Date(),
        is_delete: false,
        username: 'userC'
      },
    ];
  
    const result = CommentReply.groupReplyByCommentId(replies);
  
    expect(result['comment-1']).toHaveLength(2);
    expect(result['comment-2']).toHaveLength(1);
  });

  it('should group replies correctly into their respective comment', () => {
    const comments = [
      {
        id: 'comment-1',
        content: 'some comment',
        created_at: new Date(),
        username: 'userA',
        is_delete: false,
      },
    ];

    const repliesGrouped = {
      'comment-1': [
        new CommentReply({
          id: 'reply-1',
          content: 'reply content',
          created_at: new Date(),
          username: 'userB',
          is_delete: false,
        }),
      ],
    };

    const result = CommentReply.formatCommentsWithReplies(comments, repliesGrouped);

    expect(result[0].replies).toHaveLength(1);
    expect(result[0].replies[0]).toBeInstanceOf(CommentReply);
  });

  it('should replace reply content with "**balasan telah dihapus**" when is_delete is true', () => {
    const replies = [
      {
        id: 'reply-1',
        content: 'some content',
        comment_id: 'comment-1',
        created_at: new Date(),
        is_delete: true,
        username: 'userA',
      },
    ];
  
    const result = CommentReply.groupReplyByCommentId(replies);
    expect(result['comment-1'][0].content).toBe('**balasan telah dihapus**');
    expect(result['comment-1'][0].is_delete).toBe(true);
  });
  
  it('should fallback is_delete to false when it is undefined', () => {
    const replies = [
      {
        id: 'reply-2',
        content: 'some reply',
        comment_id: 'comment-2',
        created_at: new Date(),
        username: 'userB',
      },
    ];
  
    const result = CommentReply.groupReplyByCommentId(replies);
    expect(result['comment-2'][0].is_delete).toBe(false);
  });

  
  it('should replace comment content with "**komentar telah dihapus**" when is_delete is true', () => {
    const comments = [
      {
        id: 'comment-1',
        content: 'some comment',
        created_at: new Date(),
        username: 'userA',
        is_delete: true,
      },
    ];
  
    const repliesGrouped = {};
  
    const result = CommentReply.formatCommentsWithReplies(comments, repliesGrouped);
    expect(result[0].content).toBe('**komentar telah dihapus**');
    expect(result[0].is_delete).toBe(true);
  });
  
});



