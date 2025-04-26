const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    Topic:{
        type:String
    },
    data:[
        {
            question:{
                type:String
            },
            outputQuestion:{
                type:String
            },
            Answer:{
                theory:{
                    type:String||null
                },
                code:{
                    type:String||null
                }
            },
            category:{
                type:String,
                enum:['theory','output']
            }
        }
    ]
})

const PythonTheory = mongoose.model('PythonTheory',schema)
module.exports = PythonTheory