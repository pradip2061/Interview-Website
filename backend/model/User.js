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
    },
    role:{
        type:String,
        default:"user"
    }
})

const User= mongoose.model('User',schema)
module.exports=User