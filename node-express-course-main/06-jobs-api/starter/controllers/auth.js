const user = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const error = require("../errors/index")



const register = async (req, res) =>{
    const User = await user.create({...req.body})
    const token = User.createJWT();
    res.status(StatusCodes.CREATED).json({User:{name:User.getName()}, token})

}
const login = async (req, res) =>{
    
    const {email, password} = req.body;
    if (!email || !password){
        throw new error.BadRequestError("please provide email and password")
    }
    const User = await user.findOne({email})
    if(!User){
        throw new error.UnauthenticatedError('invalid email')
    }
    const valid = await User.checkPassword(password);
    if(valid === false){
        throw new error.UnauthenticatedError('invalid password')
    }

    const token = User.createJWT();
    res.status(StatusCodes.OK).json({user:{name:User.name}, token})
}

module.exports={register, login}