const user = require ('../models/user')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors/index')
const {createToken} = require('../utils/index')



const register = async (req, res) =>{
    const {email, name, password} = req.body;
    const emailAlreadyExists = await user.findOne({email})
    if (emailAlreadyExists){
        throw new CustomError.BadRequestError("Email already exists")
    }
    const newUser = await user.create({name, email, password})
    const tokenUser = {name:newUser.name, userId:newUser._id, role:newUser.role}
    //const token = jwt.sign(tokenUser, 'jwtsecret', {expiresIn: '1d'})
    const token = createToken({payload:tokenUser})

    const oneDay = 1000*60*60*24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay)
    })

    res.status(StatusCodes.CREATED).json({user: tokenUser, })
}
const login = async (req, res) =>{
    res.send('login user')
}
const logout = async (req, res) =>{
    res.send('logout user')
}

module.exports = {
    register,
    login,
    logout
}