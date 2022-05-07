const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    taskId:{
        type:String,
        required:true,
    },
    projectId:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default:'To do'
    },
    priority:{
        type:String,
        required:true,
        default:'normal'
    },
    creator: {
        type: String,
        required: true
    },
    creatorPicture:{
        type:String,
        required:false,
    },
    createdAt:{
        type:String,
        default:new Date()
    }
}, { timestamp: true })

const Task = mongoose.model('Task', task)
module.exports = Task;