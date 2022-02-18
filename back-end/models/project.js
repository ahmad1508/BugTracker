const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const project = new Schema({
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
        default:'Public'
    },
    description: {
        type: String,
        required: false,
        default:'No description'
    },
    owner: {
        type: String,
        required: true
    },
    participants: {
        type: Array,
        required: true
    }
}, { timestamp: true })

const Project = mongoose.model('Project', project)
module.exports = Project;