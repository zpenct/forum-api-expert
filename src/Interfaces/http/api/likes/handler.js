/* istanbul ignore file */

const ToggleLikeCommentUseCase = require('../../../../Applications/use_case/comments/ToggleLikeCommentUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;
    this.putLikeHandler = this.putLikeHandler.bind(this);
  }

  async putLikeHandler(request, h) {
    const toggleLikeCommentUseCase = this._container.getInstance(ToggleLikeCommentUseCase.name);

    const { id: userId } = request.auth.credentials;
    const { threadId, commentId } = request.params;

    await toggleLikeCommentUseCase.execute({ userId, threadId, commentId });

    return h.response({
      status: 'success',
    }).code(200);
  }
}

module.exports = LikesHandler;
