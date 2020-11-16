const express = require('express')

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 9093

const app = express()

// Define middleware here
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//Routes 
const userRouter = require('./routes/user')
app.use('/user', userRouter)

const chatRouter = require('./routes/chat')
app.use('/user', chatRouter)

// Model
const Chat = require('./models/Chat')
// Chat.remove({}, (err, doc) => console.log(doc))

// Use socket.io with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.on('sendMsg', data => {
    const {from, to, msg} = data
    const chatId = [from, to].sort().join('_')
    Chat.create({chatId, from, to, content: msg}, (err, doc) => {
      io.emit('receiveMsg', Object.assign({}, doc._doc))
    })
  })
})

// Connect to the MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/seekAndHire", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('connected', () => console.log('Connected MongoDB Successfully'))

// Start the server
server.listen(PORT, () => console.log(`App running on port ${PORT}!`))