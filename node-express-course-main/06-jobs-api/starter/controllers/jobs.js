const getAllJobs = (req, res) =>{
    res.send("get all jobs")
}
const getJob = (req, res) =>{
    res.send("get job")
}
const createJob = (req, res) =>{
    res.send("create job")
}
const updateJob = (req, res) =>{
    res.send("update job")
}
const deleteJob = (req, res) =>{
    res.send("delete jobs")
}

module.exports = {getAllJobs,getJob,deleteJob,updateJob,createJob}