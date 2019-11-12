var express = require('express');
var router = express.Router();
let seasonController = require('../controllers/seasonsController');


/* GET users listing. */
router

  .get('/', async (req, res) => {
    try {
      let data = await seasonController.getAll();
      if(!data) res.json({ 
        message: 'data not found'
       }) 
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })

  .get('/:id', async (req, res) => {
    try {
      let data = await seasonController.getFindId(req.params.id);
      if(!data) res.json({ 
        message: 'data not found'
       }) 
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })

  .post('/create', async (req, res) => {
    try {
      let data = await seasonController.create(req.body);
      res.json(data)
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })

  .put('/edit/:id', async (req, res) => {
    try {
      let data = await seasonController.edit(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json(error);
    }  

  })

  .delete('/delete/:id', async (req, res) => {
    try {
      let data = await seasonController.delete(req.params.id);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  })

module.exports = router;