const Project = require("../models/project");

const create_project = (proj,res)=>{
    const project = new Project(proj)
    project.save().then(result=>{
        res.send(result)
    })
}

module.exports = {
    create_project,
};