const mongoose =require('mongoose')
const schema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const User= mongoose.model('User',schema)
module.exports=User