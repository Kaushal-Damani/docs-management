const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Regular', "Admin"],
        default: "Regular"
    }
},{timestamps: true})

module.exports = new mongoose.model('Users', userSchema)