const express = require("express");
const router = express.Router();
const { getAllTasks, 
    getTask, 
    createTask, 
    deleteTask, 
    updateTask, } = require('../controllers/tasks')

router.route('/').get(getAllTasks);
router.route('/').post(createTask);
router.route('/:id').delete(deleteTask);
router.route('/:id').patch(updateTask);
router.route('/:id').get(getTask);

module.exports = router
