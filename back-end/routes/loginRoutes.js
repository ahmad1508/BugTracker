const express = require('express')
const router = express.Router()
const User = require("../models/user");
const userController = require('../controllers/userController')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID)


router.post('/google-login', async (req, res) => {
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

module.exports = router