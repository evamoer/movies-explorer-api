/**
 * Расширенный класс ошибки для запроса, по которому ничего нет.
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

/**
 * Экспорт ошибки.
 */
module.exports = NotFoundError;
