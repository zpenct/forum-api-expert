class ToggleLikeCommentUseCase {
  constructor({ likeRepository, threadRepository, commentRepository }) {
    this._likeRepository = likeRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute({ userId, threadId, commentId }) {
    if (!userId || !threadId || !commentId) {
      throw new Error('TOGGLE_LIKE_COMMENT_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // Validasi: thread dan komentar harus eksis
    await this._threadRepository.verifyThreadIsExist(threadId);
    await this._commentRepository.verifyCommentIsExist(commentId);

    // Toggle like: insert jika belum, delete jika sudah
    await this._likeRepository.setCommentLikes(userId, commentId);
  }
}

module.exports = ToggleLikeCommentUseCase;
