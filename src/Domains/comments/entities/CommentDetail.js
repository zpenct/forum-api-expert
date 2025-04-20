class CommentDetail {
  constructor(payload) {
    const { id, content, date, username, is_delete, replies = [] } = payload;
  
    this._verifyPayload({ id, content, date, username, replies });
  
    this.id = id;
    this.content = is_delete ? '**komentar telah dihapus**' : content;
    this.date = date;
    this.username = username;
    this.replies = replies;
  }
  

  _verifyPayload({ id, content, date, username, replies }) {
    if (!id || !content || !date || !username) {
      throw new Error('COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      (date instanceof Date) === false ||
      typeof username !== 'string' ||
      !Array.isArray(replies)
    ) {
      throw new Error('COMMENT_DETAILS.PROPERTY_HAVE_WRONG_DATA_TYPE');
    }
  }
}

module.exports = CommentDetail;