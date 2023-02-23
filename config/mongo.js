const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const { DB_URI } = process.env

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const dbConnect = () => {

    mongoose.connect(DB_URI, mongoOptions, (error) => {
        if (!error) {
            console.log('Database connected!')
        } else {
            console.error('Database connection error', error)
        }
    })

}

module.exports = dbConnect