const valid = require('validator')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { func } = require('joi');

const userSchema = new mongoose.Schema({
    name:{ type:String, require: [true, 'Please provide a name'], minlength:5, maxlength: 50 },
    email:{ type:String, require: [true, 'Please provide an email'],validate:{
        validator: valid.isEmail,
        message: 'provide a valid email'
    }, unique: true},
    password:{ type:String, require: [true, 'Please provide a password'], minlength:7, maxlength: 100},
    role:{
        type:String,
        enum:['admin', 'user'],
        default: 'user'
    }
})

userSchema.pre('save', async function(){
    //console.log(this.modifiedPaths());
    //console.log(this.isModified('name'));
    
    //zodat enkel hashen van wachtwoorden gebeurt wnr je wachtwoord aanpast
    if (!this.isModified('password')){
        return
    }else{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
})

userSchema.methods.comparePassword = async function (canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
} 

module.exports = mongoose.model('user', userSchema)
