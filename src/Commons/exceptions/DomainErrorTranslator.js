const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('refresh token harus string'),


  'ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'ADD_THREAD_USE_CASE.PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'),
  'ADD_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROERTY': new InvariantError('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'),
  'ADD_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('komentar harus berupa string'),
  'ADD_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING': new InvariantError('komentar harus terisi'),
  'ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat balasan baru karena properti yang dibutuhkan tidak ada'),
  'ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE': new InvariantError('balasan harus berupa string'),
  'ADD_REPLY_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING': new InvariantError('balasan harus berupa string'),
  
  'COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('Tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'),
};

module.exports = DomainErrorTranslator;
