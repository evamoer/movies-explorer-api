const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Обработчик запроса получения всех пользователей.
 */
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

/**
 * Обработчик запроса регистрации нового пользователя.
 */
const createUser = (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(401).send({ message: 'Переданы некорректные данные.' });
  }
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(401).send({ message: 'Пользователь с таким email уже существует.' });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ email, password: hash, name }))
    .then((userData) => res.status(201).send({ data: { id: userData._id, email: userData.email } }))
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

/**
 * Обработчик запроса авторизации пользователя.
 */
const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

/**
 * Обработчик запроса получения профиля текущего пользователя.
 */
const getMyProfile = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким id не существует.' });
      }
      return res.status(200).send(user);
    })
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

/**
 * Обработчик запроса редактирования профиля текущего пользователя.
 */
const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователя с таким id не существует.' });
      }
      return res.status(200).send(user);
    })
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getMyProfile,
  updateUserProfile,
};
