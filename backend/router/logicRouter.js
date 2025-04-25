const express = require('express')
const search = require('../controller/logic/SearchController')

const router2 = express.Router()
router2.post('/search',search)
module.exports = router2