const Task = require('../models/task')

const getAllTasks = (req, res) =>{
    res.send('all tasks')
}
const getTask = (req, res) =>{
    res.send({id:req.params.id})
}
const createTask = async (req, res) =>{
    const task = await Task.create(req.body)
    res.status(201).json(task)
}
const deleteTask = (req, res) =>{
    res.send('delete a task')
}
const updateTask = (req, res) =>{
    res.send('update a task')
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
}