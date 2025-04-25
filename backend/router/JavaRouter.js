const express = require('express')
const { createJavaQuestionOutput, createJavaQuestionTheory, getjavaquestion } = require('../controller/languages/Java')
const router1 = express.Router()

router1.post('/javaqueryOutput',createJavaQuestionOutput)
router1.post('/javaqueryTheory',createJavaQuestionTheory)
router1.get('/javaqueryget/:topics',getjavaquestion)


module.exports=router1