const isURL = require('validator/lib/isURL');
const BadRequestError = require('../errors/bad-request-err');

const urlValidation = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Неправильный формат ссылки.');
  }
  return value;
};

module.exports = {
  urlValidation,
};
