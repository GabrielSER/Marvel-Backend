const express = require('express')
const router = express.Router()
const { handleError } = require('../common/apiError')
const { adminMiddleware } = require('../common/authMiddleware')

const {
    batchInsert,
    getCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters')

router.post('/admin', handleError(req => batchInsert(req.body)))

router.get('/', handleError(getCharacters))

router.get('/:id', handleError(req => getCharacter(req.params.id)))

router.post('/', handleError(req => createCharacter(req.body)))

router.put('/:id', handleError(req => updateCharacter(req.params.id, req.body)))

router.delete('/:id', handleError(req => deleteCharacter(req.params.id)))

module.exports = router