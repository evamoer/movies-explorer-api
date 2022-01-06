const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { otherMessages, errorsMessages } = require('../config/config');

/**
 * Модель для пользователя.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: otherMessages.emailValidationMessage,
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

/**
 * Собственный метод модели пользователя
 * для определения пользователя по имейлу и паролю.
 */
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorsMessages.wrongUnauthorizedErrorMessage));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(errorsMessages.wrongUnauthorizedErrorMessage));
          }
          return user;
        });
    });
};

/**
 * Экспорт модели.
 */
module.exports = mongoose.model('user', userSchema);
