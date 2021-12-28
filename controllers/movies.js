const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

/**
 * Обработчик запроса получения всех фильмов, сохраненных пользователем.
 */
const getSavedMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((error) => res.status(500).send({ message: `Ошибка: ${error.name}` }));
};

/**
 * Обработчик запроса добавления фильма в "сохранённые фильмы" пользователя.
 */
const addMovie = (req, res, next) => {
  const owner = req.user._id;
  const newMovie = req.body;
  Movie.create({ ...newMovie, owner })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
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
        throw new NotFoundError('Карточки с таким id не существует.');
      }
      if (!movie.owner.equals(owner)) {
        throw new ForbiddenError('Нельзя удалить чужой фильм.');
      }
      return movie.remove().then(() => res.send({ message: 'Фильм удалён.' }));
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  addMovie,
  removeMovie,
};
