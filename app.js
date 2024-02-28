require('dotenv').config()
var fs = require('fs')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const dbConnect = require('./config/mongo')

app.use(cors())
app.use(express.json())

const {
    PORT = 5000,
    SERVE_PATH = 'public'
} = process.env

const attributeController = require('./controllers/attributes')

app.listen(PORT, async () => {
    console.log(fs.readFileSync('./assets/banner.txt').toString('utf-8'))
    console.log(`\nRunning app on: http://localhost:${PORT}`)
    try {
        await dbConnect()
        console.log('Database connected!')
    } catch (error) {
        console.error('Database connection error', error)
    }
    
    console.log('\nServer started!\n')
    
    await attributeController.bootstrap()
}) 

app.use('/api', require('./routes'))

// Serve frontend
app.use(express.static(path.join(__dirname, SERVE_PATH)))

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, SERVE_PATH, 'index.html'))
})