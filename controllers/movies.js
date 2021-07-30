const Movies = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;
  Movies.findById(movieId)
    .orFail(() => new Error('Movie not found'))
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        Movies.deleteOne({ _id: movieId }
          .then(() => res.send({ message: 'successfully deleted' })));
      } else {
        return Promise.reject(new Error('Forbidden'));
      }
    })
    .catch((err) => next(err));
};
