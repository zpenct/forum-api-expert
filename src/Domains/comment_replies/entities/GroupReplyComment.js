const CommentReply = require('./CommentReply');

function groupReplyByCommentId(replies) {
  const result = {};

  replies.forEach((reply) => {
    console.log({reply})
    const formattedReply = new CommentReply({
      ...reply,
      date: reply.created_at,
    });

    if (!result[reply.comment_id]) {
      result[reply.comment_id] = [formattedReply];
    } else {
      result[reply.comment_id].push(formattedReply);
    }
  });

  return result;
}

module.exports = groupReplyByCommentId;
