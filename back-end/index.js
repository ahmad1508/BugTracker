const express = require('express');
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys')
const User = require("./models/user");
const userRoutes = require('./routes/userRoutes')
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv')
const cors = require('cors')
const userController = require("./controllers/userController");

mongoose.connect(keys.mongoURI)
dotenv.config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)
app.use(express.json())
app.use(cors()) //and this



app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIEND_ID
    })

    //save user to db here


    const user = await User.findOne({ googleId: ticket.payload.sub })
    console.log(user)
    if (user) {
        const { name, email, picture } = user
        console.log({ name, email, picture })
        res.json({ name, email, picture })
    } else {
        const { name, email, picture } = ticket.getPayload()
        userController.create_user(ticket)
        res.json({ name, email, picture })
    }

    //send repsponse to 

})



app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port ${PORT} `))