const { catchErrors, ApiError, ErrorCode } = require('./apiError')
const { validateToken } = require('../common/jwtUtil')
const { USER_TYPE } = require('../models/nosql/users')

const authMiddleware = async (req, res, next) =>
    await catchErrors(res, () => {
        req.tokenBody = validateToken(req)
        next()
    })

const adminMiddleware = async (req, res, next) => {
    await authMiddleware(req, res, () => {
        const tokenBody = req.tokenBody
        const { roles } = tokenBody
        if (!roles.includes(USER_TYPE.ADMIN.name)) {
            throw new ApiError(ErrorCode.FORBIDDEN, 'Insufficient permissions')
        }
        next()
    })
}

module.exports = {
    authMiddleware,
    adminMiddleware
}