const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');

describe('DomainErrorTranslator', () => {
  it('should translate REGISTER_USER domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_LIMIT_CHAR')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'));
    expect(DomainErrorTranslator.translate(new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER')))
      .toStrictEqual(new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'));
  });

  it('should translate USER_LOGIN domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('harus mengirimkan username dan password'));
    expect(DomainErrorTranslator.translate(new Error('USER_LOGIN.PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('username dan password harus string'));
  });

  it('should translate AUTHENTICATION USE CASE domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')))
      .toStrictEqual(new InvariantError('harus mengirimkan token refresh'));
    expect(DomainErrorTranslator.translate(new Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('refresh token harus string'));
    expect(DomainErrorTranslator.translate(new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN')))
      .toStrictEqual(new InvariantError('harus mengirimkan token refresh'));
    expect(DomainErrorTranslator.translate(new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('refresh token harus string'));
  });

  it('should translate ADD_THREAD_USE_CASE domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('ADD_THREAD_USE_CASE.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('ADD_THREAD_USE_CASE.PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'));
  });

  it('should translate ADD_COMMENT_USE_CASE domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('ADD_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('ADD_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('komentar harus berupa string'));
    expect(DomainErrorTranslator.translate(new Error('ADD_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING')))
      .toStrictEqual(new InvariantError('komentar harus terisi'));
  });

  it('should translate ADD_REPLY_COMMENT_USE_CASE domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('tidak dapat membuat balasan baru karena properti yang dibutuhkan tidak ada'));
    expect(DomainErrorTranslator.translate(new Error('ADD_REPLY_COMMENT_USE_CASE.PAYLOAD_PROPERTY_HAVE_WRONG_DATA_TYPE')))
      .toStrictEqual(new InvariantError('balasan harus berupa string'));
    expect(DomainErrorTranslator.translate(new Error('ADD_REPLY_COMMENT_USE_CASE.CANNOT_BE_EMPTY_STRING')))
      .toStrictEqual(new InvariantError('balasan harus berupa string'));
  });

  it('should translate COMMENT_DETAILS domain errors correctly', () => {
    expect(DomainErrorTranslator.translate(new Error('COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY')))
      .toStrictEqual(new InvariantError('Tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'));
  });

  it('should return original error when error message is not needed to translate', () => {
    const error = new Error('SOME_UNKNOWN_ERROR');
    const result = DomainErrorTranslator.translate(error);
    expect(result).toStrictEqual(error);
  });
});
