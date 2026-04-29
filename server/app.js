const express = require('express')
const mongodb = require('./mongodb.js')
const dotenv = require('dotenv')
const cors = require('cors')

const userRoute = require('./routes/users.route.js')
const sweetsRoute = require('./routes/sweets.route.js')
const namkeensRoute = require('./routes/namkeens.route.js')
const chocolatesRoute = require('./routes/chocolates.route.js')

dotenv.config()
const port = process.env.PORT

const app = express()
mongodb.connection()
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))

app.use('/api/users', userRoute)
app.use('/api/product', sweetsRoute)
app.use('/api/product', namkeensRoute)
app.use('/api/product', chocolatesRoute)


app.listen(port, () =>{
    console.log(`Server : UP | ${port}`)
})