/**
 * Конфигурация для "соли" при создании хэша пароля.
 */
const SALT_ROUNDS = 10;

/**
 * Конфигурация для дев-версии адреса базы данных.
 */
const DB_URI_DEV = 'mongodb://localhost:27017/moviesdb';

/**
 * Конфигурация для дев-версии JWT.
 */
const JWT_SECRET_DEV = 'some-secret-key';

/**
 * Конфигурация regex-выражения для определения URL.
 */
const URL_REG_EXP = /https?:\/\/(www\.)?[\w-]*\.[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?/;

/**
 * Конфигурация для rateLimit.
 */
const rateLimitSettings = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

/**
 * Экспорт конфигураций.
 */
module.exports = {
  SALT_ROUNDS,
  DB_URI_DEV,
  JWT_SECRET_DEV,
  URL_REG_EXP,
  rateLimitSettings,
};
