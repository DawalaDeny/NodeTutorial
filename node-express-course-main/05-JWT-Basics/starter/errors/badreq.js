const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require("./custom-error")

class badReq extends CustomAPIError {
    constructor(message, statusCode) {
      super(message)
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
  
  module.exports = badReq
  