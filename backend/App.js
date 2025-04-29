const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDatabase = require('./database/index');
const HtmlRouter = require('./router/HtmlRouter');
const JavaRouter = require('./router/JavaRouter');
const PythonRouter=require('./router/PythonRouter')
const LogicRouter = require('./router/logicRouter');
const AuthenticateRouter =require('./router/AuthenticateRouter')
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToDatabase();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://interview-website-nine.vercel.app'
];

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

// Routes
app.use('/interview', HtmlRouter, JavaRouter, LogicRouter,PythonRouter,AuthenticateRouter);

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
