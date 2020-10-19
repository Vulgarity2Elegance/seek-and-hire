const express = require('express')
const mongoose = require('mongoose')

// connect MongoDB
const DB_URL = 'mongodb://localhost:27017/seekAndHire'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => console.log('Connected Successfully'))

// model
const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, required: true},
  age: {type: Number, required: true}

}))

const app = express()
app.get('/', (req, res) => {
  res.send('<h1>Sever</h1')
})
app.get('/data', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc)
  })
})
app.listen(9093, () => console.log('Node app start at port 9093'))