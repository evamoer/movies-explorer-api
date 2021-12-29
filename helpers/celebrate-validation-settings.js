const { Joi } = require('celebrate');
const { urlValidation } = require('./url-validation');

const signupCelebrateValidationSettings = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
};

const signinCelebrateValidationSettings = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const updateUserCelebrateValidationSettings = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const addMovieCelebrateValidationSettings = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation, 'custom URL validation'),
    trailer: Joi.string().required().custom(urlValidation, 'custom URL validation'),
    thumbnail: Joi.string().required().custom(urlValidation, 'custom URL validation'),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const removeMovieCelebrateValidationSettings = {
  params: Joi.object().keys({ movieId: Joi.string().length(24).hex() }),
};

module.exports = {
  signupCelebrateValidationSettings,
  signinCelebrateValidationSettings,
  updateUserCelebrateValidationSettings,
  addMovieCelebrateValidationSettings,
  removeMovieCelebrateValidationSettings,
};
