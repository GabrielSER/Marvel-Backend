const express = require('express')
const router = express.Router()
const { handleError } = require('../common/apiError')
const {
    getCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters')


router.get('/', handleError(getCharacters))

router.get('/:id', handleError(req => getCharacter(req.params.id)))

router.post('/', handleError(req => createCharacter(req.body)))

router.put('/:id', handleError(req => updateCharacter(req.params.id, req.body)))

router.delete('/:id', handleError(req => deleteCharacter(req.params.id)))


module.exports = router