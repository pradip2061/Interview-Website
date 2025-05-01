const express = require('express')
const search = require('../controller/logic/SearchController')
const verifytoken = require('../middleware/Authverify')
const Userquery = require('../controller/logic/UserQueryController')
const verifyUserAdmin = require('../controller/logic/VerifyUserAdmin')

const router2 = express.Router()
router2.post('/search',search)
router2.post('/userquery',verifytoken,Userquery)
router2.post('/verify',verifytoken,verifyUserAdmin)
module.exports = router2