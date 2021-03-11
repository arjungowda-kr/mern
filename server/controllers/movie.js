const Movie = require('../models/movie');

const createMovie = (req, res) => {
  const body = req.body;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'Please provide movie' });
  }

  const movie = new Movie(body);

  if (!movie) {
    return res.status(400).json({ success: false, error: err });
  }

  movie
    .save()
    .then(() => {
      return res
        .status(201)
        .json({ success: true, id: movie._id, message: 'Movie Created' });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: 'Movie not created' });
    });
};

const updateMovie = (req, res) => {
  const body = req.body;

  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: 'Please provide data to update' });
  }

  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Movie not found!',
      });
    }
    movie.name = body.name;
    movie.time = body.time;
    movie.rating = body.rating;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: movie._id,
          message: 'Movie updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Movie not updated!',
        });
      });
  });
};

const deleteMovieById = async (req, res) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }

    return res.status(200).json({ success: true, data: movie });
  });
};

const getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    return res.status(200).json({ success: true, data: movie });
  }).catch((err) => console.log(err));
};

const getMovies = async (req, res) => {
  await Movie.find({}, (err, movies) => {
    if (err) {
      res.status(400).json({ success: false, error: err });
    }

    if (!movies.length) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    return res.status(200).json({ success: true, data: movies });
  }).catch((err) => console.log(err));
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovieById,
  getMovieById,
  getMovies,
};
