const Task = require('../models/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json(tasks)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
    res.send('all tasks')
}
const getTask = (req, res) => {
    res.send({ id: req.params.id })
}
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}
const deleteTask = (req, res) => {
    res.send('delete a task')
}
const updateTask = (req, res) => {
    res.send('update a task')
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
}