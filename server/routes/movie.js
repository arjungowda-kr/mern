const express = require('express');

const movieCtrl = require('../controllers/movie')
const router = express.Router()

router.post('/movie', movieCtrl.createMovie)
router.put('/movie/:id', movieCtrl.updateMovie)
router.delete('/movie/:id', movieCtrl.deleteMovieById)
router.get('/movie/:id', movieCtrl.getMovieById)
router.get('/movies', movieCtrl.getMovies)

module.exports = router