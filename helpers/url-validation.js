const isURL = require('validator/lib/isURL');
const BadRequestError = require('../errors/bad-request-err');
const { otherMessages } = require('../config/config');

/**
 * Кастомная валидация URL для celebrate с помощью библиотеки validator.
 */
const urlValidation = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new BadRequestError(otherMessages.badRequestErrorMessage);
  }
  return value;
};

/**
 * Экспорт ошибки.
 */
module.exports = {
  urlValidation,
};
