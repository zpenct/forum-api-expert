const AddThreadUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetThreadByIdUseCase = require('../../../../Applications/use_case/threads/GetDetailThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
  }


  async postThreadHandler(request, h) {
    const { id } = request.auth.credentials;
    const payload = { owner: id, ...request.payload };
  
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(payload);
  
    return h.response({
      status: 'success',
      data: {
        addedThread,
      },
    }).code(201);
    
  }
  
  async getThreadByIdHandler(request) {
    const getThreadByIdUseCase = this._container.getInstance(GetThreadByIdUseCase.name);
    const thread = await getThreadByIdUseCase.execute(request.params);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }
}

module.exports = ThreadsHandler;