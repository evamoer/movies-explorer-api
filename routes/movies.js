const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getSavedMovies, addMovie, removeMovie,
} = require('../controllers/movies');
const { validateURL } = require('../helpers/validateURL');

router.get('/', getSavedMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL, 'custom URL validation'),
    trailer: Joi.string().required().custom(validateURL, 'custom URL validation'),
    thumbnail: Joi.string().required().custom(validateURL, 'custom URL validation'),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);
router.delete('/:movieId', celebrate({ params: Joi.object().keys({ movieId: Joi.string().length(24).hex() }) }), removeMovie);

module.exports = router;
