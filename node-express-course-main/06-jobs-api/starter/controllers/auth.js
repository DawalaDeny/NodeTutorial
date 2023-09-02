const user = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) =>{

    const User = await user.create({...req.body})
    res.status(StatusCodes.CREATED).json({User})

}
const login = async (req, res) =>{
    res.send('login user')
}

module.exports={register, login}