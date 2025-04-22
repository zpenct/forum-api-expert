const CommentDetails = require('../CommentDetail');

describe('a CommentDetails', () => {
  it('should throw error when payload did not contain right property', () => {
    // Arrange
    const payload = {
      content: 'something',
      created_at: 'something',
      username: 'something',
      replies: [],
    };

    // Action and Assert
    expect(() => new CommentDetails(payload)).toThrowError('COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload contain wrong data type', () => {
    // Arrange
    const payload = {
      id: 'something',
      content: 'something',
      created_at: 'something',
      username: 343,
      replies: [],
    };

    // Action and Assert
    expect(() => new CommentDetails(payload)).toThrowError('COMMENT_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE');
  });

  it('[POSITIVE] should create CommentDetail correctly', () => {
    const payload = {
      id: 'comment-001',
      content: 'sebuah komentar',
      created_at: new Date('2024-01-01T00:00:00.000Z'),
      username: 'johndoe',
      replies: [],
    };

    const comment = new CommentDetails(payload);

    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.created_at).toEqual(payload.created_at);
    expect(comment.username).toEqual(payload.username);
    expect(comment.replies).toEqual(payload.replies);
  });

  it('[POSITIVE] should display "**komentar telah dihapus**" when is_delete is true', () => {
    const payload = {
      id: 'comment-001',
      content: 'original comment',
      created_at: new Date(),
      username: 'user',
      is_delete: true,
      replies: [],
    };
  
    const comment = new CommentDetails(payload);
  
    expect(comment.content).toEqual('**komentar telah dihapus**');
  });
  
  
});