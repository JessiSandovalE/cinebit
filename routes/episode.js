var express = require('express');
var router = express.Router();
let episodeController = require('../controllers/episodesController');

/* GET users listing. */
router

  .get('/', async (req, res) => {
    try {
      let data = await episodeController.getAll();
      if(!data) res.json({
        message: 'data not found'
      })
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json
    }  
  
  })

  .get('/:id', async (req, res) => {
    try {
      let data = await episodeController.getFindId(req.params.id);
      if(!data) res.json({
        message: 'data not found'
      })
      res.json(data)
    } catch (error) {
      console.log(error);
      res.json
    }
  })

  .post('/create', async (req, res) => {
    try {
      let data = await episodeController.create(req.body);
      res.json(data)
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })

  .put('/edit/:id', async (req, res) => {

    try {
      let data = await episodeController.edit(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json(error);
    }  
  })

  .delete('/delete/:id', async (req, res) => {
    try {
      let data = await episodeController.delete(req.params.id);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  })

module.exports = router;