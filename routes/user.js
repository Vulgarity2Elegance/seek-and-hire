const express = require('express')
const Router = express.Router()

// To see whether the user has cookie or not
Router.get('/info', (req, res) => {return res.json({code: 1})})

module.exports = Router