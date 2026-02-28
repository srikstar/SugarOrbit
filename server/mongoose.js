const mongoose = require('mongoose')

const connection = async() =>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('DB : UP | MongoDB')
    } catch (error) {
        console.error(error)
    }
}

module.exports = { connection }