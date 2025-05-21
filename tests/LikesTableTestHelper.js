/* istanbul ignore file */

const pool = require('../src/Infrastructures/database/postgres/pool');

const LikesTableTestHelper = {
  async addLike({
    comment_likes_id = 'like-123',
    user_id = 'user-123',
    comment_id = 'comment-123',
  }) {
    const query = {
      text: 'INSERT INTO comment_likes (comment_likes_id, user_id, comment_id) VALUES ($1, $2, $3)',
      values: [comment_likes_id, user_id, comment_id],
    };

    await pool.query(query);
  },

  async findLike(user_id, comment_id) {
    const query = {
      text: 'SELECT * FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
      values: [user_id, comment_id],
    };

    const { rows } = await pool.query(query);
    return rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comment_likes');
  },
};

module.exports = LikesTableTestHelper;
