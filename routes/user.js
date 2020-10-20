const express = require('express')
const Router = express.Router()
const model = require('../models/model')
const User = model.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})

Router.post('/register', (req, res) => {
  console.log(req.body)
  const {username, password, type} = req.body
  User.findOne({username: username}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: 'Username has been created'})
    } else {
      User.create({username, password, type}, (err, doc) => {
        if (err) {
          return res.json({code: 1, msg:'server error'})
        } else {
          return res.json({code: 0})
        }
      })
    }
  })
})

// To see whether the user has cookie or not
Router.get('/info', (req, res) => {return res.json({code: 1})})

module.exports = Router