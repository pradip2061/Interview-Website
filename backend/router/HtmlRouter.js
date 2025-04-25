const express = require('express')
const {createHtmlQuestionOutput,gethtmlquestion, createHtmlQuestionTheory} = require('../controller/languages/Html')
const router = express.Router()

router.post('/htmlqueryOutput',createHtmlQuestionOutput)
router.post('/htmlqueryTheory',createHtmlQuestionTheory)
router.get('/htmlqueryget/:topics',gethtmlquestion)








module.exports = router