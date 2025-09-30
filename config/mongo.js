const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { DB_URI } = process.env

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const dbConnect = async () =>
    mongoose.connect(DB_URI, mongoOptions)

module.exports = dbConnect