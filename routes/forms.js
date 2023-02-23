const express = require('express')
const router = express.Router()
const { handleError } = require('../common/apiError')
const {
    getForms,
    getForm,
    createForm,
    updateForm,
    deleteForm
} = require('../controllers/Forms')


router.get('/', handleError(getForms))

router.get('/:id', handleError(req => getForm(req.params.id)))

router.post('/', handleError(req => createForm(req.body)))

router.put('/:id', handleError(req => updateForm(req.params.id, req.body)))

router.delete('/:id', handleError(req => deleteForm(req.params.id)))


module.exports = router