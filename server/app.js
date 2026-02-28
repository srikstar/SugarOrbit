const express = require('express')
const mongodb = require('./mongoose.js')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT
const app = express()
mongodb.connection()

app.listen(port, () =>{
    console.log(`Server : UP | ${port}`)
})