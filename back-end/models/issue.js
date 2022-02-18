const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issue = new Schema({
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
    creator: {
        type: String,
        required: true
    },
}, { timestamp: true })

const Issue = mongoose.model('Issue', issue)
module.exports = Issue;