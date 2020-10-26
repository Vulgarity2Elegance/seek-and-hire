const express = require('express')
const Router = express.Router()
const User = require('../models/User')
const Chat = require('../models/Chat')
const _filter = {'password': 0, '__v': 0}

// User.remove({}, (err, doc) => console.log(doc))

Router.get('/list', (req, res) => {
  const {type} = req.query
  User.find({type}, (err, doc) => {
    return res.json({code: 0, data: doc})
  })
})

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

Router.post('/update', (req, res) => {
  const userId = req.cookies.userId
  if (!userId) {
    return json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userId, body, (err, doc) => {
    const data = Object.assign({}, {
      username: doc.username,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

Router.post('/login', (req, res) => {
  const {username, password} = req.body
  User.findOne({username, password}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: 'Username & password are not valid'})
    }
    res.cookie('userId', doc._id)
    return res.json({code: 0, data: doc})
  })
})

Router.post('/register', (req, res) => {
  console.log(req.body)
  const {username, password, type} = req.body
  User.findOne({username: username}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: 'Username has been created'})
    }
    const userModel = new User({username, type, password})
    userModel.save((err, doc) => {
      if (err) {
        return res.json({code: 1, msg:'server error'})
      }
      const {username, type, _id} = doc
      res.cookie('userId', _id)
      return res.json({code: 0, data: {username, type, _id}})
    })

  })
})

// To see whether the user has cookie or not
Router.get('/info', (req, res) => {
  const {userId} = req.cookies
  if(!userId) {
    return res.json({code: 1})
  }
  User.findOne({_id: userId}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: 'server error'})
    }
    if (doc) {
      return res.json({code:0, data: doc})
    }
  })
})

module.exports = Router