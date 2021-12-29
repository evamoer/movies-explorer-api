const mongoose = require('mongoose');
const { URL_REG_EXP } = require('../config/config');

/**
 * Модель для фильма.
 */
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REG_EXP.test(url);
      },
      message: 'Введите URL.',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REG_EXP.test(url);
      },
      message: 'Введите URL.',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REG_EXP.test(url);
      },
      message: 'Введите URL.',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

/**
 * Экспорт модели.
 */
module.exports = mongoose.model('movie', movieSchema);
