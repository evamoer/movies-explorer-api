const Movie = require('../models/movie');

/**
 * Обработчик запроса получения всех фильмов пользователя.
 */
const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

/**
 * Обработчик запроса создания нового фильма в аккаунте пользователя.
 */
const createMovie = (req, res) => {
  const newMovie = req.body;
  Movie.create({ ...newMovie })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

/**
 * Обработчик запроса удаления фильма из аккаунта пользователя.
 */
const deleteMovieById = (req, res) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return res.status(404).send({ message: 'Пользователя с таким id не существует.' });
      }
      return movie.remove().then(() => res.send({ message: 'Фильм удалён.' }));
    })
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
