const LikeRepository = require('../LikeRepository');

describe('LikeRepository interface', () => {
  it('should throw error when invoking abstract methods', async () => {
    const likeRepository = new LikeRepository();

    await expect(likeRepository.setCommentLikes('', '')).rejects
      .toThrowError('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(likeRepository.countCommentLikes([])).rejects
      .toThrowError('LIKE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
