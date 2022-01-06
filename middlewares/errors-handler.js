const { errorsMessages } = require('../config/config');

/**
 * Миддлвэр для обработки ошибок.
 */
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? errorsMessages.defaultErrorMessage : message,
  });
  next();
};
