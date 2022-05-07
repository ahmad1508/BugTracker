const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issue = new Schema({
    issueId:{
        type:String,
        required:true,
    },
    projectId:{
        type:String,
        required:true,
    },
    groupId:{
        type:String,
        default:true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default:'open'
    },
    description: {
        type: String,
        required: false,
        default:'No description'
    },
    creator: {
        type: String,
        required: true
    },
    workingOn: {
        type: String,
        required: false,
        default:""
    },
    
    createdAt:{
        type:String,
        default:new Date()
    }
}, { timestamp: true })

const Issue = mongoose.model('Issue', issue)
module.exports = Issue;