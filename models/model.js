const mongoose = require('mongoose')

// connect MongoDB
const DB_URL = 'mongodb://localhost:27017/seekAndHire'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => console.log('Connected Successfully'))