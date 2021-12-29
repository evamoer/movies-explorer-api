const SALT_ROUNDS = 10;
const DB_URI_DEV = 'mongodb://localhost:27017/moviesdb';
const JWT_SECRET_DEV = 'some-secret-key';
const URL_REG_EXP = /https?:\/\/(www\.)?[\w-]*\.[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?/;

module.exports = {
  SALT_ROUNDS,
  DB_URI_DEV,
  JWT_SECRET_DEV,
  URL_REG_EXP,
};
