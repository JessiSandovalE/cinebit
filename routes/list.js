let express = require('express');
let router = express.Router();
let listController = require('../controllers/listController');

/* GET users listing. */
router

  .get('/all', async (req, res) => {
    try {
      let data = await listController.getList();
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

  .get('/details', async (req, res) => {
    try {
      let data = await listController.createDetails();
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
    List
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

    List
      .findByIdAndUpdate({
          _id: req.params.id
        },
        req.body
      )
      .then((data) => {
        List.findOne({
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
    List
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