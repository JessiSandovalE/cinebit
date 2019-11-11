var express = require('express');
var router = express.Router();
let Detail = require('../models/detailModel');

/* GET users listing. */
router

  .get('/', async (req, res) => {
    Detail
      .find((err, data) => {
        if (err) res.json(err);
        res.json(data);
      })
  })

  .get('/:id', async (req, res) => {
    Detail
      .findById(req.params.id, (err, data) => {
        if (err) res.json(err);
        res.json(data);
      })
  })

  .post('/create', async (req, res) => {
    Detail
      .create(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.json({
          error: err
        })
      })
  })

  .put('/edit/:id', async (req, res) => {

    Detail
      .findByIdAndUpdate({
          _id: req.params.id
        },
        req.body
      )
      .then((data) => {
        Detail.findOne({
            _id: req.params.id
          })
          .then((data) => {
            res.json(data);
          })
      })
      .catch(err => {
        res.json({
          error: err
        })
      })
  })

  .delete('/delete/:id', async (req, res) => {
    Detail
      .findByIdAndRemove({
        _id: req.params.id
      })
      .then((data) => {
        res.json({
          message: `Registro eliminado - id: ${req.params.id}`
        });
      })
      .catch(err => {
        res.json({
          error: err
        })
      })
  })

module.exports = router;