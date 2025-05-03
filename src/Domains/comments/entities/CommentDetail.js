class CommentDetail {
  constructor(payload) {
    const { id, content, created_at, username, is_delete, replies } = payload;
  
    this._verifyPayload({ id, content, created_at, username, replies });
  
    this.id = id;
    this.content = is_delete ? '**komentar telah dihapus**' : content;
    this.created_at = created_at;
    this.username = username;
    this.replies = replies;
  }
  

  _verifyPayload({ id, content, created_at, username, replies }) {
    if (!id || !content || !created_at || !username) {
      throw new Error('COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      (created_at instanceof Date) === false ||
      typeof username !== 'string'
    ) {
      throw new Error('COMMENT_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE');
    }
  }
}

module.exports = CommentDetail;