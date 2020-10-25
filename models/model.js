const mongoose = require('mongoose')

// connect MongoDB
const DB_URL = 'mongodb://localhost:27017/seekAndHire'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => console.log('Connected Successfully'))

const models = {
  user: {
    'username': {type: String, require: true},
    'password': {type: String, require: true},
    'type': {type: String, require: true},
    'avatar': {type: String},
    'bio': {type: String},
    'title': {type: String},
    'company': {type: String},
    'salary': {type: String}
  },
  chat: {
    'chatId': {type: String, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'read': {type: Boolean , default: false},
    'content': {type: String, require: true, default: ''},
    'create_time': {type: Number, default: new Date().getTime()},
  }
}

for (let model in models) {
  mongoose.model(model, new mongoose.Schema(models[model]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}