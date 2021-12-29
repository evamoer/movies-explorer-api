/**
 * Расширенный класс ошибки для выдачи при запросе, вызывающим конфликт.
 */
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

/**
 * Экспорт ошибки.
 */
module.exports = ConflictError;
