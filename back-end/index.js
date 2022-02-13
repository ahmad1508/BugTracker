const app = require('express')();
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require("./models/user");
const userRoutes = require('./routes/userRoutes')

mongoose.connect(keys.mongoURI)


app.use("/users", userRoutes);



app.listen('5000', () => console.log('Listening on port 5000'))