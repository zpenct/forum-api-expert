class CommentReply {
    constructor(payload) {
      this._verifyPayload(payload);
      this.id = payload.id;
      this.content = payload.is_delete
        ? '**balasan telah dihapus**'
        : payload.content;
      this.username = payload.username;
      this.date = payload.date;
      this.is_delete = payload.is_delete;
    }
  
    _verifyPayload(payload) {
      const {
        id, username, content, is_delete, date,
      } = payload;
  
      if (id == null || username == null || content == null || is_delete == null) {
        throw new Error('COMMENT_ENTITY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (
        typeof id !== 'string' ||
        typeof username !== 'string' ||
        typeof content !== 'string' ||
        typeof is_delete !== 'boolean' ||
        (date instanceof Date) === false
      ) {
        throw new Error('COMMENT_ENTITY.PROPERTY_HAVE_WRONG_DATA_TYPE');
      }
    }
  }
  
  module.exports = CommentReply;