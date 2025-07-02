const UserModel = require('../models/user')
const jwt = require("jsonwebtoken")

const auth = async (req,res,next) => {
    const headerAuth = req.headers.authorization

    if(!headerAuth?.startsWith('Bearer ')){
        return res.status(401).json({message: "UnAuthorized.."})
    }

    const token = headerAuth.split(' ')[1]

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await UserModel.findById(payload.id).select('-password')
        if(!req.user) return res.status(401).json({message: "UnAuthorized.."})

        next()
    }catch (err){
        return res.status(401).json({message: "Invalid Token.."})
    }
}

 module.exports = auth