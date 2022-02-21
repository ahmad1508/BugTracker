const User = require("../models/user");

const create_user = (ticket) => {
    const user = new User({
        googleId: ticket.payload.sub,
        email: ticket.payload.email,
        name: ticket.payload.name,
        picture: ticket.payload.picture,
    })
    user.save().then(result => {
        return result
    })
}

const get_user = async (id, res) => {
    User.findOne({ googleId: id }).then(user => {
        res.status(200).send(user)
    })
}

const delete_user_project = async (project_to_delete_Id, profile, res) => {
    const user = await User.findOne(profile)
    const projects_to_keep = user.projects.filter((projectId) => projectId !== project_to_delete_Id)
    user.projects = projects_to_keep
    user.save()
    res.send(profile)
}

const update_user = async (userId, project) => {
    const user = await User.findOne({ googleId: userId })
    user.projects.push(project.projectId)
    user.save()
    return user
}



module.exports = {
    create_user,
    update_user,
    get_user,
    delete_user_project
};