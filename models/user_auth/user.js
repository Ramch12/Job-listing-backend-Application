const mongoose = require('mongoose');
const moment = require('moment-timezone');
const brcypt = require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config({path:"../../config/.env"});

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        min: 3,
        max: 20,
        required: true,
    },
    last_name: {
        type: String,
        min: 3,
        max: 20,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    phone_no: {
        type: Number,
        required: true,
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    }
});

schema.pre('save', async function(next){
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
});

schema.methods.Getjwttoken=function()
{
    return jwt.sign({_id:this._id},process.env.Priate_key);
}


const User = mongoose.model('user', schema);
module.exports = User;