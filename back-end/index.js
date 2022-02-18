const express = require('express');
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require("./models/user");
const Project = require("./models/project");
const Issue = require("./models/issue");

const userController = require('./controllers/userController')
const projectController = require('./controllers/projectController')
const issueController = require('./controllers/issueController')

const dotenv = require('dotenv')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4 } = require('uuid');

mongoose.connect(keys.mongoURI)
dotenv.config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


app.use(express.json())
app.use(cors()) //and this



//token verification and user creation
app.post('/api/google-login', async (req, res) => {
    //Verify token
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIEND_ID
    })

    //save user to db here and send info back
    const user = await User.findOne({ googleId: ticket.payload.sub })
    if (user) {
        const { name, email, picture, googleId, projects } = user
        res.json({ name, email, picture, googleId, projects })
    } else {
        const { name, email, picture } = ticket.getPayload()
        userController.create_user(ticket)
        const googleId = ticket.payload.sub
        const projects = []
        res.json({ name, email, picture, googleId, projects })
    }
})

app.post('/api/getUser',async (req,res)=>{
    userController.get_user(res.params.id,res)
})

app.post('/api/project', (req, res) => {
    const projectId = 'project:' + uuidv4()
    const project = req.body

    project.projectId = projectId

    projectController.create_project(project)
    const user = userController.update_user(project.owner, project)

    console.log(user)
    res.status(200).send(project)
})

app.post('/api/get_projects', async (req, res) => {
    console.log('bdy')
    console.log(req.body)
    const projectsId = req.body
    const projects = []

    const response = await Project.find()
    projectsId.forEach(Id => {
        response.map((project) => {
            if (project.projectId === Id) {
                projects.push(project)
            }

        })
    })
    res.status(200).send(projects)
})



app.get('/api/create_issue', async (req, res) => {
    issueController.create_issue()
})

app.post('/api/get_issues', async (req, res) => {
    const projectId = req.body.id
    console.log(projectId)
    const Todo = []
    const Doing = []
    const Done = []

    const issues = await Issue.find()
    issues.forEach(issue => {
        if (issue.projectId === projectId) {
            if (issue.status === 'Todo') {
                Todo.push(issue)
            } else if (issue.status === 'Doing') {
                Doing.push(issue)
            } else if (issue.status === 'Done') {
                Done.push(issue)
            }
        }
    })
    const all_issues = {
        Todo,
        Doing,
        Done
    }
    res.status(200).send(all_issues)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT} `))