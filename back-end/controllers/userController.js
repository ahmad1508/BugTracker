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


const update_user = async (userId,project)=>{
    const user = await User.findOne({ googleId: userId })
    user.projects.push(project.projectId)
    user.save()
    return user
}



module.exports = {
    create_user,
    update_user,
};