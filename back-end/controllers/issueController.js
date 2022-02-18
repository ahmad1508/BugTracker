const Issue = require("../models/issue");

const create_issue = ()=>{
    const issue= new Issue({
        projectId:'project:0d2b685d-aebb-4c61-9063-c66384d50457',
        title:'working on backend',
        status:'Doing',
        creator:'101764142382466407968'
    })
    issue.save().then(result=>{
        console.log(result)
    })
}



module.exports = {
    create_issue
};