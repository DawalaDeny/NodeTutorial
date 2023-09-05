const Job = require('../models/Job');
const {StatusCodes}= require('http-status-codes');
const error = require('../errors/')

const getAllJobs = async (req, res) =>{
    
    const jobs = await Job.find({createdBy:req.user.userId}).sort(('createdAt'))
    res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}
const getJob = async (req, res) =>{
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOne({_id:jobId, createdBy:userId});
    if (!job){
        throw new error.NotFoundError('no job found')
    }
   res.status(StatusCodes.OK).json({job:job})
}
const createJob =async (req, res) =>{
   req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})  
}
const updateJob = async (req, res) =>{
    const {
        user:{userId}, 
        params:{id:jobId},
        body:{company, position},
    } = req
    if (!company || !position){
        throw new error.BadRequestError("provide valid company and position")
    }
 
    const job = await Job.findOneAndUpdate({_id:jobId, 
        createdBy:userId}, {company, position}, 
        {new:true, runValidators:true})
    if (!job){
        throw new error.NotFoundError('no job found')
    }
   res.status(StatusCodes.OK).json({job:job})
 
}
const deleteJob = async (req, res) =>{
    const {
        user:{userId}, 
        params:{id:jobId},
    } = req
    const job = await Job.deleteOne({_id:jobId,
         createdBy:userId})
    if(!job){
        throw new error.NotFoundError('cannot delete')
    }

    res.status(StatusCodes.OK).send()
}

module.exports = {getAllJobs,getJob,deleteJob,updateJob,createJob}