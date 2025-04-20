class AddReplyCommentUseCase {
    constructor({ replyRepository, commentRepository, threadRepository }) {
      this._replyRepository = replyRepository;
      this._commentRepository = commentRepository;
      this._threadRepository = threadRepository;
    }
  
    async execute(payload) {
      this._verifyPayload(payload);
      await this._threadRepository.verifyThreadIsExist(payload.threadId);
      await this._commentRepository.verifyCommentIsExist(payload.commentId);
      return this._replyRepository.addReplyComment(payload);
    }
  
    _verifyPayload(payload) {
      const {
        threadId, commentId, content, owner,
      } = payload;
  
      if (threadId == null || commentId == null || content == null || owner == null) {
        throw new Error('ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof threadId !== 'string' || typeof commentId !== 'string' || typeof content !== 'string' || typeof owner !== 'string'
      ) {
        throw new Error(
          'ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE',
        );
      }
  
      if (content === '') {
        throw new Error(
          'ADD_REPLY_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING',
        );
      }
    }
  }
  
  module.exports = AddReplyCommentUseCase;