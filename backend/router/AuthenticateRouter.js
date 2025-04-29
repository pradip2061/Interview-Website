const express = require('express')
const { requestOtp, verifyOtpanduser } = require('../controller/Authentication/SignupController')
const Login = require('../controller/Authentication/LoginController')
const router4 = express.Router()

router4.post('/otpsent',requestOtp)
router4.post('/verifyotp',verifyOtpanduser)
router4.post('/login',Login)






module.exports = router4