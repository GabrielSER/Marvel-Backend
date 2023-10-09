const express = require('express')
const router = express.Router()
const { handleError } = require('../common/apiError')
const {
    getAttributes,
    getAttribute,
    createAttribute,
    updateAttribute,
    deleteAttribute
} = require('../controllers/attributes')


router.get('/', handleError(getAttributes))

router.get('/:id', handleError(req => getAttribute(req.params.id)))

router.post('/', handleError(req => createAttribute(req.body)))

router.put('/:id', handleError(req => updateAttribute(req.params.id, req.body)))

router.delete('/:id', handleError(req => deleteAttribute(req.params.id)))


module.exports = router