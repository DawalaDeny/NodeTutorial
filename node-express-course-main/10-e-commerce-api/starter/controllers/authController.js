const user = require ('../models/user')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors/index')
const {attachCookiesToResponse} = require('../utils/index')
const User = require('../models/user')



const register = async (req, res) =>{
    const {email, name, password} = req.body;
    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists){
        throw new CustomError.BadRequestError("Email already exists")
    }
    const newUser = await User.create({name, email, password})
    const tokenUser = {name:newUser.name, userId:newUser._id, role:newUser.role}
    //const token = jwt.sign(tokenUser, 'jwtsecret', {expiresIn: '1d'})
    attachCookiesToResponse({res, user:tokenUser})
    

   
    res.status(StatusCodes.CREATED).json({user: tokenUser, })
}
const login = async (req, res) =>{
    const {email, password} = req.body;
    if (!email || !password){
        throw new CustomError.BadRequestError("please provide email and password");
    }
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    const tokenUser = {name:user.name, userId:user._id, role:user.role}
    
    attachCookiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser, })

}
const logout = async (req, res) =>{

    res.cookie('token', "logout", 
    {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000), //5 sec        
    })
    res.status(StatusCodes.OK).json({msg: "user logged out"})

   
}

module.exports = {
    register,
    login,
    logout
}