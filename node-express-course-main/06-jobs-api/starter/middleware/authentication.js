const User = require('../models/User')
const JWT = require('jsonwebtoken')
const error = require('../errors')

const auth = async (req, res, next) =>{
const authHeader = req.headers.authorization
if (!authHeader || !authHeader.startsWith('Bearer')){
    throw new error.UnauthenticatedError('Authentication invalid')
}
const token = authHeader.split(' ')[1];
try {
     
    const payload = JWT.verify(token, process.env.JWT_KEY)
    req.user = {userId:payload.userId, name:payload.name}
    next()
} catch (e) {
    throw new error.UnauthenticatedError('Authentication invalid')
}
}

module.exports = auth