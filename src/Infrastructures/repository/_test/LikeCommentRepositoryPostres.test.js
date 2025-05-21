const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const LikeCommentRepositoryPostgres = require('../LikeCommentRepositoryPostres');

describe('LikeCommentRepositoryPostgres', () => {
  afterEach(async () => {
    await LikesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('setCommentLikes function', () => {
    it('should insert a like when user hasn\'t liked the comment', async () => {
      const userId = 'user-2342';
      const threadId = 'thread-90152891';
      const commentId = 'comment-6868321';

      await UsersTableTestHelper.addUser({ id: userId, username: 'gundala' });
      await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId });
      await CommentsTableTestHelper.addComment({ id: commentId, owner: userId, threadId: threadId, content:"tess" });

      const fakeIdGenerator = () => '5445';
      const likeRepositoryPostgres = new LikeCommentRepositoryPostgres(pool, fakeIdGenerator);

      await likeRepositoryPostgres.setCommentLikes(userId, commentId);

      const likes = await LikesTableTestHelper.findLike(userId, commentId);
      expect(likes).toHaveLength(1);
      expect(likes[0].comment_likes_id).toEqual('like-5445');
    });

    it('should delete the like when user already liked the comment', async () => {
      const userId = 'user-2342';
      const threadId = 'thread-90152891';
      const commentId = 'comment-6868321';

      await UsersTableTestHelper.addUser({ id: userId, username: 'gundala' });
      await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId });
      await CommentsTableTestHelper.addComment({ id: commentId, owner: userId, threadId: threadId, content:"tess" });

      await LikesTableTestHelper.addLike({
        comment_likes_id: 'like-5445',
        user_id: userId,
        comment_id: commentId,
      });

      const fakeIdGenerator = () => 'ignored'; // id tidak akan dipakai karena sudah like
      const likeRepositoryPostgres = new LikeCommentRepositoryPostgres(pool, fakeIdGenerator);

      await likeRepositoryPostgres.setCommentLikes(userId, commentId);

      const likes = await LikesTableTestHelper.findLike(userId, commentId);
      expect(likes).toHaveLength(0);
    });
  });

  describe('countCommentLikes function', () => {
    it('should count comment\'s likes correctly', async () => {
      const userId1 = 'user-2342';
      const userId2 = 'user-414';
      const threadId = 'thread-90152891';
      const commentId1 = 'comment-6868321';
      const commentId2 = 'comment-90781';

      await UsersTableTestHelper.addUser({ id: userId1, username: 'jim' });
      await UsersTableTestHelper.addUser({ id: userId2, username: 'tess' });
      await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId1 });
      await CommentsTableTestHelper.addComment({ id: commentId1, owner: userId1, threadId: threadId, content: 'some comment' });
      await CommentsTableTestHelper.addComment({ id: commentId2, owner: userId2, threadId: threadId,content: 'some comment' });

      await LikesTableTestHelper.addLike({
        comment_likes_id: 'like-134',
        user_id: userId1,
        comment_id: commentId1,
      });

      await LikesTableTestHelper.addLike({
        comment_likes_id: 'like-145',
        user_id: userId2,
        comment_id: commentId1,
      });

      await LikesTableTestHelper.addLike({
        comment_likes_id: 'like-224',
        user_id: userId1,
        comment_id: commentId2,
      });

      const likeRepositoryPostgres = new LikeCommentRepositoryPostgres(pool, () => 'unused');

      const likes = await likeRepositoryPostgres.countCommentLikes([commentId1, commentId2]);

      expect(likes).toEqual(
        expect.arrayContaining([
          { comment_id: commentId1, count: 2 },
          { comment_id: commentId2, count: 1 },
        ]),
      );
    });
  });
});
