class AddThread {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const { title, body, owner, id } = payload;
      this.title = title;
      this.body = body;
      this.owner = owner;
      this.id = id;
    }
  
    _verifyPayload({ title, body }) {
      if (!title || !body) {
        throw new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof title !== 'string' || typeof body !== 'string') {
        throw new Error('ADD_THREAD_USE_CASE.PROPERTY_HAVE_WRONG_DATA_TYPE');
      }
    }
  }
  
  module.exports = AddThread;