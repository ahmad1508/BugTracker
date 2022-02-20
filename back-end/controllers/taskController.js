const res = require("express/lib/response");
const Task = require("../models/task");

const create_Task = (taskToAdd,res) => {
    const task = new Task(taskToAdd)
    task.save().then(result => {
        res.send(result)
    })
}



module.exports = {
    create_Task
};