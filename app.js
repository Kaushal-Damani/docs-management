require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose");

const userRouter = require('./routes/user')
const documentRouter = require('./routes/document')

const app =  express()

app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("DB connection success..")
}).catch((err) => {
    console.log(err)
})

app.use('/api/users', userRouter)
app.use('/api/documents', documentRouter)



module.exports = app