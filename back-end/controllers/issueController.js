const Issue = require("../models/issue");

const create_issue = (issue,res)=>{
    const time = new Date().getTime()
    issue.createdAt = time
    const issue_add = new Issue(issue)
    issue_add.save().then(result=>{
        res.send(result)
    })
}

module.exports = {
    create_issue,
};