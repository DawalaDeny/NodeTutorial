const {CustomAPIerror} = require("../error/custom-error")

const errorHandlerMiddleware = (err, req, res, next) =>{
   if (err instanceof CustomAPIerror)
   {
    return res.status(err.statuscode).json({msg:err.message})
   }
    return res.status(500).json({msg: "something went wrong, please try again"})
}

module.exports=errorHandlerMiddleware   