const mongoose = require('mongoose')

const mongodb = async () => {
    try {
        await mongoose.connect('mongodb+srv://srikanthreddyn:228Oc89idYrOPbEp@cluster0.fc8x6gr.mongodb.net/SugarOrbit?appName=Cluster0')
        console.log('Mongo DB Connected')
    } catch (error) {
        console.log('Failed to connect to DB!')
    }
}

module.exports = { mongodb }