const { Router } = require('express')
const router = Router()
const fs = require('fs')

const removeExtension = (filename) =>
    filename.split('.').shift()

fs.readdirSync(__dirname).forEach((file) => {
    const fileName = removeExtension(file)
    if (fileName !== 'index') {
        console.log(`Loading route ${fileName}...`)
        router.use(`/${fileName}`, require(`./${fileName}`))
    }
})

module.exports = router
