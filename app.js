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

const attributeController = require('./controllers/attributes')
// form.set('specialSkills', undefined, {strict: false} )

app.listen(PORT, async () => {
    console.log(fs.readFileSync('./assets/banner.txt').toString('utf-8'))
    console.log(`\nRunning app on: http://localhost:${PORT}`)
    try {
        await dbConnect()
        console.log('Database connected!')
    } catch (error) {
        console.error('Database connection error', error)
    }

    app.use('/api', require('./routes'))
    
    console.log('\nServer started!\n')
    
    await attributeController.bootstrap()
})

