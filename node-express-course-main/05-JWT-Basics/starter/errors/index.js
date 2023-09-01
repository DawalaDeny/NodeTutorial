const CustomAPIError = require('../errors/custom-error')
const badReq = require("../errors/badreq")
const unauthenticatedError = require('../errors/unauthenticated')

module.exports = {CustomAPIError, badReq, unauthenticatedError}