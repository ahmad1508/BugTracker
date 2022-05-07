const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueGroup = new Schema({
    groupId:{
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
    color:{
        type: String,
        required: true
    }
}, { timestamp: true })

const IssueGroup = mongoose.model('IssueGroup', issueGroup)
module.exports = IssueGroup;