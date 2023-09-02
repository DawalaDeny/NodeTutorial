const user = require('../models/User')
const {StatusCodes} = require('http-status-codes')


const register = async (req, res) =>{
    const User = await user.create({...req.body})
    const token = User.createJWT();
    res.status(StatusCodes.CREATED).json({User:{name:User.getName()}, token})

}
const login = async (req, res) =>{
    res.send('login user')
}

module.exports={register, login}