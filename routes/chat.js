const express = require('express')
const Router = express.Router()
const User = require('../models/User')
const Chat = require('../models/Chat')

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userId
  let users = {}
  User.find({}, (e, userdoc) => {
    userdoc.forEach(v => {
      users[v._id] = {name: v.username, avatar: v.avatar}
    })
  })
  Chat.find({'$or':[{from: user}, {to: user}]}, (err, doc) => {
    if (!err) {
      return res.json({code: 0, msgs: doc, users: users})
    }
  })
})

Router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userId
  const {from} = req.body
  Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true}, (err, doc) => {
    if (!err) {
      console.log(doc)
      return res.json({code: 0, num: doc.nModified})
    }
  })
})

module.exports = Router