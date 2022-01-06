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
const URL_REG_EXP = /https?:\/\/(www\.)?[\w-]*\.[\w\-._~:\\/?#[\]@!$&'()*+,;=]*#?/;

/**
 * Конфигурация для rateLimit.
 */
const rateLimitSettings = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

const otherMessages = {
  deleteMovieMessage: 'Фильм удалён.',
  urlValidationMessage: 'Введите URL.',
  emailValidationMessage: 'Введите email.',
};

const errorsMessages = {
  badRequestErrorMessage: 'Переданы некорректные данные.',
  userConflictErrorMessage: 'Пользователь с данным email уже зарегистрирован.',
  movieConflictErrorMessage: 'Данный фильм уже был добавлен к пользователю.',
  movieForbiddenErrorMessage: 'Нельзя удалить чужой фильм.',
  pageNotFoundErrorMessage: 'Данной страницы не существует.',
  userNotFoundErrorMessage: 'Пользователя с данным id не существует.',
  movieNotFoundErrorMessage: 'Фильма с данным id не существует.',
  authUnauthorizedErrorMessage: 'Необходимо авторизоваться.',
  wrongUnauthorizedErrorMessage: 'Неправильные почта или пароль.',
  defaultErrorMessage: 'Произошла ошибка на сервере.',
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
  otherMessages,
  errorsMessages,
};
