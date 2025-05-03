/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("comment_likes", {
      comment_likes_id: {
        type: "VARCHAR(50)",
        primaryKey: true,
      },
      user_id: {
        type: "VARCHAR(50)",
        notNull: true,
      },
      comment_id: {
        type: "VARCHAR(50)",
        notNull: true,
      },
    });
  
    pgm.addConstraint("comment_likes", "unique_user_id_comment_id", {
      unique: ["user_id", "comment_id"],
    });
  
    pgm.addConstraint(
      "comment_likes",
      "fk_comment_likes.user_id_users.id",
      "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE"
    );
  
    pgm.addConstraint(
      "comment_likes",
      "fk_comment_likes.comment_id_comments.id",
      "FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE"
    );
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("comment_likes");
  };