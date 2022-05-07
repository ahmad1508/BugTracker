const router = require('express').Router()
const projectController = require('../controllers/projectController')
const userController = require('../controllers/userController')

const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");

const { v4: uuidv4 } = require('uuid');
const { remove } = require('../models/project');


router.post('/get_projects', async (req, res) => {
    const projectsId = req.body.projectsId
    const projects = []
    for (let i = 0; i < projectsId.length; i++) {
        const project = await Project.findOne({ projectId: projectsId[i] })
        if (project) projects.push(project)
    }

    res.status(200).send(projects)
})


router.post('/create_project', async (req, res) => {
    const projectId = 'project:' + uuidv4()
    const project = req.body

    /* project creation*/
    project.projectId = projectId
    /*setting creation time */
    const time = new Date().getTime()
    project.createdAt = time
    /*saving project*/
    const project_unsaved = new Project(project)
    const saved_project = await project_unsaved.save()

    /* save to user projects*/
    const user = await User.findOne({ googleId: project.owner })
    user.projects.push(project.projectId)
    const saved_user = await user.save()

    const update = {
        project: saved_project,
        user: saved_user
    }
    res.status(200).send(update)
})


router.post('/delete_project/:id', async (req, res) => {
    const id = req.params.id
    const deleted_project = await Project.deleteOne({ projectId: id })
    const deleted_task = await Task.deleteMany({ projectId: id })
    console.log(deleted_project)
    console.log(deleted_task)
    res.send(deleted_project)
})

router.post('/get_participants', async (req, res) => {
    const participants = req.body.participants
    let usersInfo = []

    for (let i = 0; i < participants.length; i++) {
        const user = await User.findOne({ googleId: participants[i] })
        if (user) usersInfo.push(user)
    }
    res.status(200).send(usersInfo)
})

/* We have the users to add and the projectId and we want to add the users to the project participants and 
    the projectId to users project list
    Thing to check before adding : 
        - if the user exists
        - If the user is already in participants or project already in users project list
    see if the project is in the users list of projects
            if found do not add the project to the project list and vice versa
            else add the project to list
    */
router.post('/add_participants', async (req, res) => {
    const users = req.body.users
    const projectId = req.body.projectId
    const addedUsers = []
    const alreadyParticipants = []
    const usersNotFound = []
    console.log({ users })
    console.log({ projectId })

    const project = await Project.findOne({ projectId: projectId })
    console.log({ project })
    for (let i = 0; i < users.length; i++) {
        const user = await User.findOne({ email: users[i] })
        console.log({ user })
        if (user) { //if user is found 
            const index = user.projects.indexOf(projectId) // we see if the project is in the users list by checking if index is diff than -1
            if (index == '-1') { //if -1 ==> project isn't in user 
                project.participants.push(user.googleId)
                user.projects.push(projectId)
                addedUsers.push(user)
                user.save()
            } else {
                alreadyParticipants.push(user)
            }
        } else {
            usersNotFound.push(users[i])
        }
        console.log({ addedUsers })
        console.log({ usersNotFound })
        console.log({ alreadyParticipants })
    }

    const saved_project = await project.save()
    console.log(saved_project)
    const response = {
        project: saved_project,
        addedUsers: addedUsers,
        alreadyparticipants: alreadyParticipants,
        usersNotFound: usersNotFound
    }

    res.status(200).send(response)
})


router.post('/remove_participant', async (req, res) => {
    const participantId = req.body.participantId
    const projectId = req.body.projectId
    // remove id from project list 
    const project = await Project.findOne({ projectId: projectId })
    const indexOfUser = project.participants.indexOf(participantId)
    project.participants.splice(indexOfUser, 1);//1 to remove one item only
    const saved_project = await project.save()

    // remove project from user project list
    const user = await User.findOne({ googleId: participantId })
    const indexOfProject = user.projects.indexOf(projectId)
    user.projects.splice(indexOfProject, 1)
    const saved_user = await user.save()

    const response = {
        project: saved_project,
        user: saved_user,
    }

    res.status(200).send(response)
})


module.exports = router