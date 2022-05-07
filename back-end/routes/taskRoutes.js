const router = require('express').Router()
const taskController = require('../controllers/taskController')


const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");

const { v4: uuidv4 } = require('uuid');
const { model } = require('mongoose');



router.post('/create_task', async (req, res) => {
    const task = req.body
    const taskId = 'task:' + uuidv4()
    task.taskId = taskId
    taskController.create_Task(task, res)
})
router.post('/edit_task', async (req, res) => {
    const task = req.body
    const taskFound = await Task.findOne({ taskId: task.taskId })
    taskFound.title = task.title
    const taskEdited = await taskFound.save()
    res.send(taskEdited)
})

router.post('/get_tasks', async (req, res) => {
    const projectId = req.body.id
    const todo = await Task.find({ projectId: projectId, status: 'todo' })
    const doing = await Task.find({ projectId: projectId, status: 'doing' })
    const done = await Task.find({ projectId: projectId, status: 'done' })

    const all_tasks = {
        todo, doing, done
    }
    res.status(200).send(all_tasks)
})
router.post('/move_task', async (req, res) => {
    const taskId = req.body.taskId
    const status = req.body.status
    const task = await Task.findOne({ taskId: taskId })
    task.status = status;
    const saved_task = await task.save()
    res.status(200).send(saved_task)
})
router.post('/delete_task', async (req, res) => {
    const taskId = req.body.taskId
    const task = await Task.deleteOne({ taskId: taskId })
    res.status(200).send(task)
})
router.post('/priority-change', async (req, res) => {
    const task = req.body
    const response = await Task.findOne({ taskId: task.taskId })
    response.priority = task.priority
    const updated = await response.save()
    res.status(200).send(updated)
})

module.exports = router