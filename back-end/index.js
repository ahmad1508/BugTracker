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

const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const loginRoutes = require('./routes/loginRoutes')
const issueRoutes = require('./routes/issueRoutes')

const dotenv = require('dotenv')
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4 } = require('uuid');

mongoose.connect(keys.mongoURI)
dotenv.config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


app.use(express.json())
app.use(cors()) //and this

app.use('/login', loginRoutes)
app.use('/project', projectRoutes)
app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/issue', issueRoutes)


/* app.get('/fix', async(req,res)=>{
    const tasks = await Task.find()
    tasks.forEach(task => {
        task.priority = 'normal'
        task.save()
    })
}) */



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT} `))