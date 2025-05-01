const User = require("../../model/User")

const verifyUserAdmin=async(req,res)=>{
const userid = req.user
console.log(userid)
const user = await User.findOne({_id:userid})
console.log(user)
if(user.role === "admin"){
    res.status(200).json({
        message:"admin"
    })
}else{
    res.status(200).json({
        message:"user"
    })
}
}

module.exports = verifyUserAdmin