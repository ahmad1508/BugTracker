const User = require("../models/user");

/* const get_users = (ticket) => {
    console.log("hello")
    console.log(ticket)
    User.findOne({ googleId: ticket.payload.sub }).then(result=>{
        return result
    })
     User.find().then(result => {
        return result
    }) 
} */

const create_user = (ticket) => {
    const user = new User({
        googleId: ticket.payload.sub,
        email: ticket.payload.email,
        name: ticket.payload.name,
        picture: ticket.payload.picture,
    })
    user.save().then(result => {
        console.log(result)
    })
}

module.exports = {
    create_user
};