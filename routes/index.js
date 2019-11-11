var express = require('express');
var router = express.Router();
var movies = require('../controllers/movies');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router


  .get('/details/:type/:id', async (req, res, next) => {
    try {

      let body = {
        id: req.params.id,
        type: req.params.type
      }

      let data = await movies.getDetails(body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.status(200).json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

  .get('/credits/:type/:id', async (req, res, next) => {
    try {

      let body = {
        id: req.params.id,
        type: req.params.type
      }

      let data = await movies.getCredits(body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.status(200).json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

  .get('/video/:type/:id', async (req, res, next) => {
    try {

      let body = {
        id: req.params.id,
        type: req.params.type
      }

      let data = await movies.getVideo(body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.status(200).json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

  .get('/season/:type/:id/:season', async (req, res, next) => {
    try {

      let body = {
        id: req.params.id,
        type: req.params.type,
        season: req.params.season
      }

      let data = await movies.getSeason(body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.status(200).json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

module.exports = router;