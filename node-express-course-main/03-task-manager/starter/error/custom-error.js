class CustomAPIerror extends Error{
    constructor (message, statuscode){
        super(message)
        this.statuscode = statuscode
    }
}


const createCustomError = (message, statuscode) =>{
    return new CustomAPIerror(message, statuscode)
}

module.exports = {createCustomError, CustomAPIerror}