const mongoose = require('mongoose')

const mongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log('Mongo DB Connected')
    } catch (error) {
        console.log('Failed to connect to DB!')
    }
}

module.exports = { mongodb }