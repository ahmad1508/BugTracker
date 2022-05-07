const Task = require("../models/task");

const create_Task = async (taskToAdd, res) => {
    const time = new Date().getTime()
    taskToAdd.createdAt = time
    const task = new Task(taskToAdd)
    const task_saved = await task.save()
    res.send(task_saved)
}

module.exports = {
    create_Task
};