const express = require('express')
const mongodb = require('./mongodb.js')
const dotenv = require('dotenv')
const cookies = require('cookie-parser')
const cors = require('cors')

const products = require('./routes/Products.js')

dotenv.config()
const app = express()
mongodb.mongodb()

app.use(cors({
    origin : 'http://localhost:5173',
    credentials:true,
    allowedHeaders:true
}))

app.use(express.json())

app.use('/products', products)

app.listen(8000, () =>{
    console.log('Hello from server')
})