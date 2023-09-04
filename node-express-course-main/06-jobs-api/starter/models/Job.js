const mongoose = require('mongoose')
const job = new mongoose.Schema({
    company:{type:String, required:[true, 
        'please provide company name'],
    maxLength: 50
    },
    position:{type:String, required:[true, 
        'please provide position'],
    maxLength: 100
    },
    status:{type:String, enum:['interview', 'declined', 'pending'],
    default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'please provide an user']
    }
}, {timestamps:true});
module.exports = mongoose.model('job', job)