const User = require("../models/user");

const get_users = (req, res) => {
    User.find().then(result => {
        res.send(result)
    })
}

const create_user = (req, res) => {
    const user = new User({
        email: "ramisonji99@gmail.com",
        password: "123456",
    })
    user.save().then(result => {
        res.send(result)
    })
}

module.exports = {
    get_users,
    create_user
};