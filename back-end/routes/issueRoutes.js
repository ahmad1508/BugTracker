const router = require('express').Router()


const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");
const IssueGroup = require("../models/issueGroup");
const Issue = require("../models/issue");

const issueController = require("../controllers/issueController");


const { v4: uuidv4 } = require('uuid');
const { model } = require('mongoose');


router.post('/add-group', async (req, res) => {
    const groupId = 'group:' + uuidv4()
    const group = req.body
    group.groupId = groupId
    
    const Group = new IssueGroup(group);
    const group_saved = await Group.save();
    res.send(group_saved)
})

router.post('/add-issue', async (req, res) => {
    const issueId = 'issue:' + uuidv4()
    const issue = req.body
    issue.issueId = issueId
    issueController.create_issue(issue, res)
})

router.post('/get_groups', async (req, res) => {
    const groups = await IssueGroup.find({ projectId: req.body.id })
    res.status(200).send(groups)
})
router.post('/get_issues', async (req, res) => {
    const issues = await Issue.find({ projectId: req.body.id })
    res.status(200).send(issues)
})



module.exports = router