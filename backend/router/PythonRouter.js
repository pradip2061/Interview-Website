const express = require('express')
const {createPythonQuestionOutput,getpythonquestion, createPythonQuestionTheory} = require('../controller/languages/Python')
const router3 = express.Router()

router3.post('/pythonqueryOutput',createPythonQuestionOutput)
router3.post('/pythonqueryTheory',createPythonQuestionTheory)
router3.get('/pythonqueryget/:topics',getpythonquestion)








module.exports = router3