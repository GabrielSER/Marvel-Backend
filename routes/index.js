const express = require('express')
const fs = require('fs')
const router = express.Router()

const removeExtension = (filename) => 
    filename.split('.').shift()

fs.readdirSync(__dirname).filter((file) => {
    const fileName = removeExtension(file)
    if (fileName !== 'index') {
        console.log(`Loading route ${fileName}...`)
        router.use(`/${fileName}`, require(`./${file}`))
    }
})

module.exports = router
