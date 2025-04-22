const CommentDetail = require('../../comments/entities/CommentDetail');

class CommentReply {

    constructor(payload) {
      this._verifyPayload(payload);
      this.id = payload.id;
      this.content = payload.is_delete
        ? '**balasan telah dihapus**'
        : payload.content;
      this.username = payload.username;
      this.created_at = payload.created_at;
      this.is_delete = payload.is_delete;
    }
  
    _verifyPayload(payload) {
      const {
        id, username, content, is_delete, created_at,
      } = payload;
  
      if (id == null || username == null || content == null || is_delete == null) {
        throw new Error('COMMENT_ENTITY.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (
        typeof id !== 'string' ||
        typeof username !== 'string' ||
        typeof content !== 'string' ||
        typeof is_delete !== 'boolean' ||
        (created_at instanceof Date) === false
      ) {
        throw new Error('COMMENT_ENTITY.PROPERTY_HAVE_WRONG_DATA_TYPE');
      }
    }
    
    static groupReplyByCommentId(replies) {
      const result = {};
  
      replies.forEach((reply) => {
        const formattedReply = new CommentReply({
          ...reply,
          created_at: reply.created_at,
        });
  
        if (!result[reply.comment_id]) {
          result[reply.comment_id] = [formattedReply];
        } else {
          result[reply.comment_id].push(formattedReply);
        }
      });
  
      return result;
    }

    static formatCommentsWithReplies(comments, repliesGrouped) {
      return comments.map((comment) => new CommentDetail({
        ...comment,
        replies: repliesGrouped[comment.id] ?? [],
      }));
    }
}
  
module.exports = CommentReply;