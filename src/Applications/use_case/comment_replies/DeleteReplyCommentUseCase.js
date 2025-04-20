class DeleteReplyCommentUseCase {
    constructor({ commentRepository, threadRepository, replyRepository }) {
      this._commentRepository = commentRepository;
      this._threadRepository = threadRepository;
      this._replyRepository = replyRepository;
    }
  
    async execute(payload) {
      await this._threadRepository.verifyThreadIsExist(payload.threadId);
      await this._commentRepository.verifyCommentIsExist(payload.commentId);
      await this._replyRepository.verifyReplyCommentIsExist(payload.id);
      await this._replyRepository.verifyReplyCommentOwner(payload.id, payload.owner);
      await this._replyRepository.deleteReplyCommentById(payload.id);
    }
  }
  
  module.exports = DeleteReplyCommentUseCase;