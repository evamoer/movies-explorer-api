require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUNDS, JWT_SECRET_DEV } = require('../config/config');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET_ENV } = process.env;

/**
 * Обработчик запроса получения всех пользователей.
 */
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

/**
 * Обработчик запроса регистрации нового пользователя.
 */
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((userData) => res.status(201).send({ data: { email, id: userData._id } }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
      }
      next(err);
    });
};

/**
 * Обработчик запроса авторизации пользователя.
 */
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_ENV : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неправильные почта или пароль.')));
};

/**
 * Обработчик запроса получения профиля текущего пользователя.
 */
const getMyProfile = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует.');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

/**
 * Обработчик запроса редактирования профиля текущего пользователя.
 */
const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  ).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователя с таким id не существует.');
    }
    return res.status(200).send(user);
  })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Данный почтовый адрес занят другим пользователем.'));
      }
      next(err);
    });
};

/**
 * Экспорт обработчиков.
 */
module.exports = {
  getUsers,
  createUser,
  loginUser,
  getMyProfile,
  updateUserProfile,
};
