require('dotenv').config()
var fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const dbConnect = require('./config/mongo')

const characters = require('./assets/characters.json')
const forms = require('./assets/forms.json')
const attributes = require('./assets/attributes.json')

const {attributeModel} = require('./models/index')

app.use(cors())
app.use(express.json())

const {
    PORT
} = process.env

app.listen(PORT, () => {
    console.log(fs.readFileSync('./assets/banner.txt').toString('utf-8'))
    console.log(`\nRunning app on: http://localhost:${PORT}`)
    dbConnect(() => {
        app.use('/api', require('./routes'))
        console.log('\nServer started')
              
    })
    const skills = new Map()
    const skillFields = ['stats', 'skills', 'specialSkills']
    const fieldToType = new Map([
        ['stats', 'stat'],
        ['skills', 'skill'],
        ['specialSkills', 'special']
    ]);

    const specialToUnique = new Map([
        ['special1', 'radiation'],
        ['special2', 'phasing'],
        ['special3', 'chlorokinesis']
    ]);


/*
    [...characters, ...forms].forEach(container => {
        skillFields.forEach(field => {
            Object.entries(container[field]).forEach(([skillUnique, value]) => {
                
            })
        })
    })*/
    
})

