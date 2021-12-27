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
  User.create({ email, password, name })
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
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
  getMyProfile,
  updateUserProfile,
};
