require('dotenv').config()
var fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnect = require('./config/mongo')

app.use(cors())
app.use(express.json())

const {
    PORT
} = process.env

app.use('/api', require('./routes'))


app.listen(PORT, () => {
    console.log(fs.readFileSync('./assets/banner.txt').toString('utf-8'))
    console.log(`tu app está lista por http://localhost:${PORT}`)
})

dbConnect()