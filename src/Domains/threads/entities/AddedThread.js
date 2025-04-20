class AddedThread {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const { id, title, owner } = payload;
  
      this.id = id;
      this.title = title;
      this.owner = owner;
    }
  
    _verifyPayload(payload) {
      const { id, title, owner } = payload;
  
      if (!id || !title || !owner) {
        throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof id !== 'string' || typeof title !== 'string' || typeof owner !== 'string') {
        throw new Error('ADDED_THREAD.PROPERTY_HAVE_WRONG_DATA_TYPE');
      }
    }
  }
  
  module.exports = AddedThread;