const { celebrate } = require('celebrate');
const router = require('express').Router();
const { addMovieCelebrateValidationSettings, removeMovieCelebrateValidationSettings } = require('../helpers/celebrate-validation-settings');
const {
  getSavedMovies, addMovie, removeMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', celebrate(addMovieCelebrateValidationSettings), addMovie);
router.delete('/:movieId', celebrate(removeMovieCelebrateValidationSettings), removeMovie);

module.exports = router;
