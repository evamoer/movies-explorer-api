const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * Миддлвэр для логирования запросов.
 */
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

/**
 * Миддлвэр для логирования ошибок.
 */
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

/**
 * Экспорт миддлвэров.
 */
module.exports = {
  requestLogger,
  errorLogger,
};
