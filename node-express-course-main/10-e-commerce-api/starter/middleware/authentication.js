const { log } = require('console');
const CustomError = require('../errors/index')
const {isTokenValid} = require('../utils/index')

const authenticateUser = async (req, res, next) =>{
    const token = req.signedCookies.token;
    if (!token){
        throw new CustomError.UnauthenticatedError("Authentication invalid")
    }
    try {
        const user  = isTokenValid({token})
        req.user = {name:user.name, userId:user.userId, role:user.role}
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication invalid")
    } 
   
}

    // const authorizePermissions = async (req, res, next) =>{
    //     const role = req.user.role
    //     if (role === "admin"){
    //         next();
    //     }else{
    //         throw new CustomError.UnauthorizedError("No authorization")
    //     }
            
    // }        
  const authorizePermissions = (...roles) =>{
       return (req, res, next) =>{
        if (!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError("No authorization")
        }
        next();
       }
    }

module.exports = {authenticateUser, authorizePermissions}