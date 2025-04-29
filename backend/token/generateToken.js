const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateTokens=(userid)=>{
    const token= jwt.sign({id:userid},process.env.SCREAT_KEY,{expiresIn:'5d'})
    return token
}
module.exports =generateTokens