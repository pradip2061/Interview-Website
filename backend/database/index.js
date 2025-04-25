const mongoose =require('mongoose')
require('dotenv').config();
const connectionString = `mongodb+srv://interview:${process.env.DB_PASS}@cluster0.acvkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToDatabase =()=>{
    mongoose.connect(connectionString)
    console.log("database is connected successfully!!")
}

module.exports =connectToDatabase