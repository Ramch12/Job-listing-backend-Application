const mongoose = require('mongoose');
const Otpschema = new mongoose.Schema({
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


Otpschema.pre('save', async function (next) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 5; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.otp = OTP;
    this.status = 1
    // console.log("THis is for saving the document as a pre");
});



const OTP = mongoose.model('otp', Otpschema);
module.exports = OTP;