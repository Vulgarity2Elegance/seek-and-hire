const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  'chatId': {type: String, require: true},
  'from': {type: String, require: true},
  'to': {type: String, require: true},
  'read': {type: Boolean , default: false},
  'content': {type: String, require: true, default: ''},
  'create_time': {type: Number, default: new Date().getTime()},
})

const Chat = mongoose.model('Chat', ChatSchema)
module.exports = Chat