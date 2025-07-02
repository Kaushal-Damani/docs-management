const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = require("../models/user")
const {validateRegister, validateLogin} = require("../utils/validateInput");


const register = async (req,res) => {

    const {error} = validateRegister(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})

    const {fullName, email, password, role} = req.body

    const isExist = await UserModel.findOne({email})
    if(isExist)
        return res.status(400).json("User already exists..")

    const hashedPassword = await bcrypt.hash((password,10))
    const user = new UserModel({fullName,email,password: hashedPassword, role})
    await user.save()
    res.status(201).json({
        message: "Registered successfully.."
    })
}

const login = async (req,res) => {

    const {error} = validateLogin(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})

    const {email,password} = req.body

    const user = await UserModel.findOne({email})
    if(!user) res.status(400).json({message: "User not found.."})

    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched) res.status(400).json({message: "Invalid credentials.."})

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.status(200).json({
        token,
        message: "Logged in successfully.."
    })
}

module.exports = {register, login}