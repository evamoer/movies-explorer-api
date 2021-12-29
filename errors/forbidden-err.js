/**
 * Расширенный класс ошибки для выдачи при запрещённом запросе.
 */
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

/**
 * Экспорт ошибки.
 */
module.exports = ForbiddenError;
