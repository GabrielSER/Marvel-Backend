const express = require('express')
const router = express.Router()
const { handleError } = require('../common/apiError')
const {
    getForms,
    getFormImages,
    getForm,
    createForm,
    updateForm,
    deleteForm
} = require('../controllers/forms')

router.get('/', handleError(getForms))

router.get('/images', handleError(() => getFormImages()))

router.get('/:id', handleError(req => getForm(req.params.id)))

router.post('/', handleError(req => createForm(req.body)))

router.put('/:id', handleError(req => updateForm(req.params.id, req.body)))

router.delete('/:id', handleError(req => deleteForm(req.params.id)))

module.exports = router