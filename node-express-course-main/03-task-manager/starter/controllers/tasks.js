const Task = require('../models/task')
const asyncWrapper = require ('../middleware/async')
const {createCustomError} = require("../error/custom-error")

const getAllTasks = asyncWrapper( async (req, res) => {

        const tasks = await Task.find({});
        res.status(201).json(tasks)

})

const getTask = asyncWrapper(async (req, res, next) => {
    
        const {id} = req.params;
        const task = await Task.findOne({_id:id});
        if (!task){
            return next(createCustomError(`no task with id: ${id}`, 404))
        }
        res.status(201).json(task)
    
    
})
const createTask = asyncWrapper(async (req, res) => {
    
        const task = await Task.create(req.body);
        res.status(201).json(task);
   
})

const deleteTask = asyncWrapper(async  (req, res) => {
   
        const {id} = req.params;
        const task = await Task.findOneAndDelete({_id:id});
        if (!task){
            return next(createCustomError(`no task with id: ${id}`, 404))
        }
        // res.status(201).json({task})
        res.status(201).send();
   

})
const updateTask =asyncWrapper( async (req, res) => {
    
    const {id} = req.params;
    const task = await Task.findOneAndUpdate({_id:id},  req.body, {
        new:true,
        runValidators:true
    })
    if(!task){
        return next(createCustomError(`no task with id: ${id}`, 404))
    }
    res.status(201).send({task:task, msg:"gelukt!"});
   
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
}