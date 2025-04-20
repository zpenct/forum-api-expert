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
      date: {},
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
      date: new Date(),
    };

    const comment = new CommentReply(payload);

    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.username).toEqual(payload.username);
    expect(comment.isDelete).not.toBeDefined();
    expect(comment.date).toEqual(payload.date);
  });

  it('if is_delete payload is true, content property should give "**komentar telah dihapus**" as a value', () => {
    const payload = {
      is_delete: true,
      content: 'example comment',
      id: 'comment-123',
      username: 'user-123',
      date: new Date(),
    };

    const comment = new CommentReply(payload);

    expect(comment.content).toEqual('**balasan telah dihapus**');
  });
});