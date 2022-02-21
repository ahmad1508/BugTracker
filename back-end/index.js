const express = require('express');
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require("./models/user");
const Project = require("./models/project");
const Task = require("./models/task");

const userController = require('./controllers/userController')
const projectController = require('./controllers/projectController')
const taskController = require('./controllers/taskController')

const dotenv = require('dotenv')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4 } = require('uuid');

mongoose.connect(keys.mongoURI)
dotenv.config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


app.use(express.json())
app.use(cors()) //and this


/*************************************************************
 *                      Login Routes
 *************************************************************/
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






/*************************************************************
 *                      User Routes
 *************************************************************/
app.post('/api/getUser', (req, res) => {
    const googleId = req.body.googleId
    userController.get_user(googleId,res)
})

app.post('/api/delete_user_project', (req,res)=>{
    const project_to_delete_Id = req.body.projectId
    const profile = req.body.profile
    userController.delete_user_project(project_to_delete_Id,profile,res)
})



/*************************************************************
 *                      Project Routes
 *************************************************************/
app.post('/api/project', (req, res) => {
    const projectId = 'project:' + uuidv4()
    const project = req.body

    project.projectId = projectId

    projectController.create_project(project,res)
    const user = userController.update_user(project.owner, project)

    //res.status(200).send(project)
})

app.post('/api/get_projects', async (req, res) => {

    const projectsId = req.body.projectsId
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

app.post('/api/delete_project',async (req,res)=>{
    const id = req.body.projectId
    Project.deleteOne({ projectId: id }).then(result=>{
        res.send(result)
    })
    Task.deleteMany({ projectId: id }).then(result=>{
        console.log('hello')
    })
})





/*************************************************************
 *                      Tasks routes Routes
 *************************************************************/
app.post('/api/create_task', async (req, res) => {
    const task = req.body
    const taskId = 'task:'+uuidv4()
    task.taskId = taskId
    taskController.create_Task(task,res)

    
})
app.post('/api/get_tasks', async (req, res) => {
    const projectId = req.body.id
    const todo = []
    const doing = []
    const done = []

    const tasks = await Task.find()
    
    tasks.forEach(task => {
        if (task.projectId === projectId) {
            if (task.status === 'todo') {
                todo.push(task)
            } else if (task.status === 'doing') {
                doing.push(task)
            } else if (task.status === 'done') {
                done.push(task)
            }
        }
    })
    const all_tasks = {
        todo,
        doing,
        done
    }
    res.status(200).send(all_tasks)
})







const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT} `))