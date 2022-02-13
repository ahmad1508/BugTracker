const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

}, { timestamp: true })

const User = mongoose.model('User', user)
module.exports = User;