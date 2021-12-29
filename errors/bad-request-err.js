/**
 * Расширенный класс ошибки для выдачи при запросе с некорректными данными.
 */
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

/**
 * Экспорт ошибки.
 */
module.exports = BadRequestError;
