const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikeCommentRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async setCommentLikes(userId, commentId) {
    const checkQuery = {
      text: 'SELECT comment_likes_id FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
      values: [userId, commentId],
    };

    const result = await this._pool.query(checkQuery);

    if (result.rowCount === 0) {
      const id = `like-${this._idGenerator()}`;
      const insertQuery = {
        text: 'INSERT INTO comment_likes (comment_likes_id, user_id, comment_id) VALUES ($1, $2, $3)',
        values: [id, userId, commentId],
      };
      await this._pool.query(insertQuery);
    } else {
      const deleteQuery = {
        text: 'DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
        values: [userId, commentId],
      };
      await this._pool.query(deleteQuery);
    }
  }

  async countCommentLikes(commentIds) {
    const placeholders = commentIds.map((_, index) => `$${index + 1}`).join(', ');
    const query = {
      text: `SELECT comment_id, COUNT(*)::int as count
             FROM comment_likes
             WHERE comment_id IN (${placeholders})
             GROUP BY comment_id`,
      values: commentIds,
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = LikeCommentRepositoryPostgres;
