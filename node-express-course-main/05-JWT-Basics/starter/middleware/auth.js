const error = require('../errors/')
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new error.unauthenticatedError("No token provided")
    }
    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    } catch (e) {
        throw new error.unauthenticatedError("No token provided")
    }

}

module.exports = authentication;