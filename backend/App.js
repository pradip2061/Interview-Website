const express = require('express')
const cors = require('cors')
const app = express()
const connectToDatabase = require('./database/index')
const HtmlRouter = require('./router/HtmlRouter')
const JavaRouter = require('./router/JavaRouter')
const logicRouter = require('./router/logicRouter')
connectToDatabase()
require('dotenv').config();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST']
}))
app.use('/interview',HtmlRouter,JavaRouter,logicRouter)
const PORT =process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`the project running at ${PORT}`)
})