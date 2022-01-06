const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');
const { errorsMessages, approveMessages } = require('../config/config');

/**
 * Обработчик запроса получения всех фильмов, сохраненных пользователем.
 */
const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

/**
 * Обработчик запроса добавления фильма в "сохранённые фильмы" пользователя.
 */
const addMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((addedMovie) => res.status(201).send(addedMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorsMessages.badRequestErrorMessage));
      }
      if (err.code === 11000) {
        next(new ConflictError(errorsMessages.movieConflictErrorMessage));
      }
      next(err);
    });
};

/**
 * Обработчик запроса удаления фильма из "сохранённых фильмов" пользователя.
 */
const removeMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorsMessages.movieNotFoundErrorMessage);
      }
      if (!movie.owner.equals(owner)) {
        throw new ForbiddenError(errorsMessages.movieForbiddenErrorMessage);
      }
      return movie.remove().then(() => res.send({ message: approveMessages.deleteMovieMessage }));
    })
    .catch(next);
};

/**
 * Экспорт обработчиков.
 */
module.exports = {
  getSavedMovies,
  addMovie,
  removeMovie,
};
