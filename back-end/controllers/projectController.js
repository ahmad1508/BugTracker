const Project = require("../models/project");

const create_project = (proj)=>{
    const project = new Project(proj)
    project.save().then(result=>{
        console.log(result)
    })
}

module.exports = {
    create_project,
};