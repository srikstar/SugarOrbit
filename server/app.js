const express = require('express')
const mongodb = require('./mongodb.js')

const products = require('./routes/Products.js')

const app = express()
mongodb.mongodb()

app.use(express.json())

app.use('/', products)

app.listen(8000, () =>{
    console.log('Hello from server')
})