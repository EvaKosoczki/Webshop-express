var express = require('express');
var router = express.Router();
var db = require('./../handler/evi-db')

router.get('/:entity/:id', (req, res, next) => {
  let databaseSmp = new db.DataBase(req.params.entity)
  let id = req.params.id || 0
  databaseSmp.readJson(id).then(
    data => res.json(data),
    err => res.json(err)
  )
})

router.get('/:entity', (req, res, next) => {
  let databaseSmp = new db.DataBase(req.params.entity)

  databaseSmp.readJson().then(
    data => res.json(data),
    err => res.json(err)
  )
})

router.post('/:entity/:id', (req, res, next) => {
  let body = req.body;
  let databaseSmp2 = new db.DataBase(req.params.entity)
  databaseSmp2.editJSON(body).then(
    data => res.send('Got the data'),
    err => res.json(err)
  )
})

router.delete('/:entity/:id', (req, res, next) => {
  let databaseSmp3 = new db.DataBase(req.params.entity)
  let id = req.params.id || 0
  databaseSmp3.deleteJSON(id).then(
    data => res.json(data),
    err => res.json(err)
  )
})

router.post('/:entity', (req, res, next) => {
  let databaseSmp4 = new db.DataBase(req.params.entity)
  let body = req.body
  databaseSmp4.addJSON(body).then(
    data => res.send('Got the new data'),
    err => res.json(err)
  )
})

module.exports = router;