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

const get_user = async (id) => {
    const user = await User.findOne({ googleId: id })
    return 'hello'   
}

const delete_user_project = async (project_to_delete_Id, profile, res) => {
    const user = await User.findOne({ googleId: profile.googleId })
    console.log(user)
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

const get_users_id = async (usersEmail) => {
    const usersFound = []
    const usersNotFound = []
    const usersId = []
    const users = await User.find()
    await usersEmail.forEach(userToAdd => {
        users.map(user => {
            if (userToAdd === user.email) {
                usersFound.push(user)
                usersId.push(user.googleId)
                
            } else {
                usersNotFound.push(userToAdd)

                console.log('heelo')
            }
        })

    })

    const result = {
        usersNotFound,
        usersFound,
        usersId
    }
    return result
}

module.exports = {
    create_user,
    update_user,
    get_user,
    delete_user_project,
    get_users_id
};