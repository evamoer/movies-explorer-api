const router = require('express').Router();
const {
  getSavedMovies, addMovie, removeMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', addMovie);
router.delete('/:movieId', removeMovie);

module.exports = router;
