/**
 * Расширенный класс ошибки для запроса с отсутствующей авторизацией.
 */
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

/**
 * Экспорт ошибки.
 */
module.exports = UnauthorizedError;
