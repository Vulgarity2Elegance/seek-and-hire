const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

// Define middleware here
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(9093, () => console.log('Node app start at port 9093'))