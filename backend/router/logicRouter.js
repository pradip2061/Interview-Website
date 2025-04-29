const express = require('express')
const search = require('../controller/logic/SearchController')
const verifytoken = require('../middleware/Authverify')
const Userquery = require('../controller/logic/UserQueryController')

const router2 = express.Router()
router2.post('/search',search)
router2.post('/userquery',verifytoken,Userquery)
module.exports = router2