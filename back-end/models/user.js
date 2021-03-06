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
    pseudo:{
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
    projects:{
        type:Array,
        required:true,
        default:[]
    }

}, { timestamp: true })

const User = mongoose.model('User', user)
module.exports = User;