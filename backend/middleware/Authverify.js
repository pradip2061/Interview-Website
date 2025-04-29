const jwt = require('jsonwebtoken')

const verifytoken=async(req,res,next)=>{
 try {
    const token = req.headers.authorization
    if(!token){
        return res.status(400).json({message:"you need to login first"})
    }
    const decoded = jwt.verify(token,process.env.SCREAT_KEY)
    console.log(decoded)
    req.user=decoded.id
    next()
 } catch (error) {
    console.log(error)
 }
}
module.exports = verifytoken