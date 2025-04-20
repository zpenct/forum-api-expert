const  groupReplyByCommentId = require('../GroupReplyComment');
const CommentReply = require('../CommentReply');

describe('[POSITIVE] groupReplyByCommentId', () => {
    it('should group replies correctly by commentId', () => {
      const replies = [
        {
          id: 'reply-001',
          comment_id: 'comment-001',
          content: 'balasan satu',
          owner: 'user-001',
          username: 'john',
          created_at: new Date('2025-04-20T00:00:00.000Z'),
          is_delete: false,
        },
        {
          id: 'reply-002',
          comment_id: 'comment-002',
          content: 'balasan dua',
          owner: 'user-002',
          username: 'doe',
          created_at: new Date('2025-04-21T00:00:00.000Z'),
          is_delete: false,
        },
        {
          id: 'reply-003',
          comment_id: 'comment-001',
          content: 'balasan tiga',
          owner: 'user-003',
          username: 'andi',
          created_at: new Date('2025-04-22T00:00:00.000Z'),
          is_delete: false,
        },
      ];
  
      const result = groupReplyByCommentId(replies);
  
      expect(Object.keys(result)).toHaveLength(2);
      expect(result['comment-001']).toHaveLength(2);
      expect(result['comment-002']).toHaveLength(1);
  
      expect(result['comment-001'][0]).toBeInstanceOf(CommentReply);
      expect(result['comment-001'][0].id).toEqual('reply-001');
      expect(result['comment-001'][1].id).toEqual('reply-003');
      expect(result['comment-002'][0].id).toEqual('reply-002');
    });
  
    it('should return empty object when no replies', () => {
      const result = groupReplyByCommentId([]);
      expect(result).toEqual({});
    });
  });