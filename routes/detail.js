let express = require('express');
let router = express.Router();
let details = require('../controllers/detailsController');

/* GET users listing. */
router

  .get('/', async (req, res) => {
    try {
      let data = await details.getAll();
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

  .get('/:id', async (req, res) => {
    try {
      let data = await details.getFindId(req.params.id);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

  .post('/create', async (req, res) => {
    try {
      let data = await details.createDetail(req.body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.status(201).json(data);
    } catch (error) {
      res.json({
        error
      });
    }
  })

  .put('/edit/:id', async (req, res) => {
    try {
      let data = await details.editDetail(req.params.id, req.body);
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

  .delete('/delete/:id', async (req, res) => {
    try {
      let data = await details.deleteDetail(req.params.id);
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