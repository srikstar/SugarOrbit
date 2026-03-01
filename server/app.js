const express = require('express')
const mongodb = require('./mongodb.js')
const dotenv = require('dotenv')

const userRoute = require('./routes/users.route.js')

dotenv.config()
const port = process.env.PORT

const app = express()
mongodb.connection()

app.use(express.json());

app.use('/api/users', userRoute)

app.listen(port, () =>{
    console.log(`Server : UP | ${port}`)
})