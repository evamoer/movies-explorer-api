require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET_DEV, errorsMessages } = require('../config/config');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET_ENV } = process.env;

/**
 * Миддлвэр для авторизации пользователя.
 */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorsMessages.authUnauthorizedErrorMessage);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_ENV : JWT_SECRET_DEV);
  } catch (err) {
    next(new UnauthorizedError(errorsMessages.authUnauthorizedErrorMessage));
  }
  req.user = payload;
  next();
};
