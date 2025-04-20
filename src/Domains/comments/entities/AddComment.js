class AddComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, owner, id } = payload;
    this.content = content;
    this.owner = owner;
    this.id = id
  }

  _verifyPayload({ content }) {
    if (!content) {
      throw new Error('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROERTY');
    }

    if (typeof content !== 'string') {
      throw new Error('ADD_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE');
    }

    if (content.trim().length === 0) {
      throw new Error('ADD_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING');
    }
  }
}

module.exports = AddComment;