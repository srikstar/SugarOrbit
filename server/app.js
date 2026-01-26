const express = require('express')
const mongodb = require('./mongodb.js')
const dotenv = require('dotenv')

const products = require('./routes/Products.js')

dotenv.config()
const app = express()
mongodb.mongodb()

app.use(express.json())

app.use('/', products)

app.listen(8000, () =>{
    console.log('Hello from server')
})