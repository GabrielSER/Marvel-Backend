const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const { DB_URI } = process.env

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToDatabase = (callback) => {

    mongoose.connect(DB_URI, mongoOptions, (error) => {
        if (!error) {
            console.log('Database connected!')
            callback()
        } else {
            console.error('Database connection error', error)
        }
    })

}

module.exports = { connectToDatabase }