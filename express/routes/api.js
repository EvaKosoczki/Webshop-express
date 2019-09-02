var express = require('express');
var router = express.Router();
var db = require('./../handler/evi-db')

router.get('/:entity/:id', async (req, res, next) => {
  let databaseSmp = new db.DataBase(req.params.entity)
  let id = req.params.id || 0
  let oneData = null;
  try {
    oneData = await databaseSmp.readJson(id)
  } catch (err) {
    res.statusCode = 404;
    return res.send(err)
  }
  res.json(oneData)
})

router.get('/:entity', async (req, res, next) => {
  let databaseSmp = new db.DataBase(req.params.entity)
  let data = [];
  try {
    data = await databaseSmp.readJson()
  } catch (err) {
    res.statusCode = 404;
    return res.send(err)
  }
  res.json(data)
})

router.post('/:entity/:id', async (req, res, next) => {
  let body = req.body;
  let databaseSmp2 = new db.DataBase(req.params.entity)
  try {
    await databaseSmp2.editJSON(body)
  } catch (err) {
    res.statusCode = 404;
    return res.send(err)
  }
  res.send("Got the data")
})

router.delete('/:entity/:id', async (req, res, next) => {
  let databaseSmp3 = new db.DataBase(req.params.entity)
  let id = req.params.id || 0
  try {
    await databaseSmp3.deleteJSON(id)
  } catch (err) {
    res.statusCode = 404;
    return res.send(err)
  }
  res.send()
})

router.post('/:entity', async (req, res, next) => {
  let databaseSmp4 = new db.DataBase(req.params.entity)
  let body = req.body
  try {
    await databaseSmp4.addJSON(body)
  } catch {
    res.statusCode = 404;
    return res.send(err)
  }
  res.send("Got the new data")
})

module.exports = router;
