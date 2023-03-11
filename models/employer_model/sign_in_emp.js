const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
require('dotenv').config({path:'../../config/.env'});

const login_schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employer'
    },
    otp: {
        type: String
    },
    status:
    {
        type: Number,
        default: 1,
        enum: [0, 1]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
});


login_schema.pre('save', async function (next) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.otp = OTP;
    this.status = 1
});


login_schema.methods.verify_otp=async function(otp)
{
    return this.otp===otp?1:0;
}

login_schema.methods.Get_jwt=function()
{   

    return jwt.sign({_id:this._id},process.env.Private_key);

}


const gen_otp = mongoose.model('otpg', login_schema);
module.exports = gen_otp;