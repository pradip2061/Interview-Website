const mongoose =require('mongoose')
const connectionString = "mongodb+srv://interview:interview123@cluster0.acvkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToDatabase =()=>{
    mongoose.connect(connectionString)
    console.log("database is connected successfully!!")
}

module.exports =connectToDatabase