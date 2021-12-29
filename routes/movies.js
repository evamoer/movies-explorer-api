const { celebrate } = require('celebrate');
const router = require('express').Router();
const { addMovieCelebrateValidationSettings, removeMovieCelebrateValidationSettings } = require('../helpers/celebrate-validation-settings');
const {
  getSavedMovies, addMovie, removeMovie,
} = require('../controllers/movies');

/**
 * Роут '/movies':
 * получение всех сохраненных фильмов пользователя,
 * добавление нового фильма,
 * удаление фильма.
 */
router.get('/', getSavedMovies);
router.post('/', celebrate(addMovieCelebrateValidationSettings), addMovie);
router.delete('/:movieId', celebrate(removeMovieCelebrateValidationSettings), removeMovie);

/**
 * Экспорт роута.
 */
module.exports = router;
