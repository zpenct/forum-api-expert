const CommentReply = require('../../../Domains/comment_replies/entities/CommentReply');

class GetDetailsThreadUseCase {
  constructor({ threadRepository, commentRepository, commentReplyRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._commentReplyRepository = commentReplyRepository;
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    this._verifyUseCasePayload(useCasePayload);
    const thread = await this._threadRepository.getThreadById(
      useCasePayload.threadId,
    );
    let comments = await this._commentRepository.getCommentsByThreadId(
      useCasePayload.threadId,
    );
    let replies = await this._commentReplyRepository
      .findRepliesByCommentIds(comments.map((comment) => comment.id));

    replies = CommentReply.groupReplyByCommentId(replies);

    comments = CommentReply.formatCommentsWithReplies(comments, replies);

    const likeCounts = await this._likeRepository.countCommentLikes(comments.map(c => c.id));
    const likeMap = new Map(likeCounts.map(row => [row.comment_id, row.count]));

    comments = comments.map(comment => ({
      ...comment,
    likeCount: likeMap.get(comment.id) || 0,
  }));

    return { ...thread, comments };
  }

  _verifyUseCasePayload(payload) {
    const { threadId } = payload;

    if (threadId == null) {
      throw new Error('GET_THREAD_BY_ID_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }
  }
}

module.exports = GetDetailsThreadUseCase;
