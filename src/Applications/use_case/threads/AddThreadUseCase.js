class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  _validatePayload(payload) {
    const { title, owner, body } = payload;

    if (!title || !owner || !body) {
      throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof owner !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD_USE_CASE.PROPERTY_HAVE_WRONG_DATA_TYPE');
    }
  }

  async execute(payload) {
    this._validatePayload(payload);
    return this._threadRepository.addThread(payload);
  }
}

module.exports = AddThreadUseCase;