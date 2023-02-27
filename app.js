require('dotenv').config()
var fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const { connectToDatabase } = require('./config/mongo')

app.use(cors())
app.use(express.json())

const {
    PORT
} = process.env

app.listen(PORT, () => {
    console.log(fs.readFileSync('./assets/banner.txt').toString('utf-8'))
    console.log(`\nRunning app on: http://localhost:${PORT}`)
    connectToDatabase(() => {
        app.use('/api', require('./routes'))
        console.log('\nServer started')
    })
})

