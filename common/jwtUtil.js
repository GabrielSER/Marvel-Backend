const {sign, verify, TokenExpiredError} = require('jsonwebtoken')
const { ApiError, ErrorCode } = require('./apiError')

const {
    JWT_SECRET_KEY,
    JWT_HEADER_KEY = 'Authorization'
} = process.env

const generateToken = (body) => {
    const data = {
        time: Date(),
        ...body
    }
    const options = {
        algorithm: 'HS256',
        expiresIn: '30d'
    }
    return sign(data, JWT_SECRET_KEY, options)
}

const validateToken = (req) => {
    const token = req.header(JWT_HEADER_KEY)?.split('Bearer ')[1]
    if(!token) {
        throw new ApiError(ErrorCode.UNAUTHORIZED, 'Missing authentication token')
    }
    try {
        const verified = verify(token, JWT_SECRET_KEY)
        if (!verified) {
            throw new ApiError(ErrorCode.UNAUTHORIZED)
        }
    } catch (error) {
        if(error instanceof TokenExpiredError) {
            throw new ApiError(ErrorCode.BAD_REQUEST, 'Outdated token')
        }
        throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid token')
    }
    return extractTokenBody(token)
}

const extractTokenBody = (token) => {
    var base64Payload = token.split('.')[1]
    var payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
}

module.exports = {
    generateToken,
    validateToken
}