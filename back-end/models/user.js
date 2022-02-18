const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    googleId:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    name: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },

}, { timestamp: true })

const User = mongoose.model('User', user)
module.exports = User;