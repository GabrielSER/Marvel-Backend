const {Router} = require('express')
const router = Router()
const { handleError } = require('../common/apiError')
const {
    getPowers,
    getPower,
    createPower,
    updatePower,
    deletePower
} = require('../controllers/powers')


router.get('/', handleError(getPowers))

router.get('/:id', handleError(req => getPower(req.params.id)))

router.post('/', handleError(req => createPower(req.body)))

router.put('/:id', handleError(req => updatePower(req.params.id, req.body)))

router.delete('/:id', handleError(req => deletePower(req.params.id)))


module.exports = router