const router = require('express').Router()
const userController = require('../controllers/userController')
const User = require("../models/user");

router.get('/:id', userController.get_user)

router.post('/delete_user_project', (req, res) => {
    const project_to_delete_Id = req.body.projectId
    const profile = req.body.profile
    userController.delete_user_project(project_to_delete_Id, profile, res)
})

router.post('/update_user', userController.update_user)


module.exports = router