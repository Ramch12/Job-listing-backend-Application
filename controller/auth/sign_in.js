const User = require('../../models/user_auth/user');
const { vali_sign_in } = require('../../Validate/validate');
const { sign_in_employer } = require('../../Validate/validate');
const bcrypt = require('bcrypt');
const { asyncHandler } = require('../../utils/asynchandler');
require('dotenv').config({ path: "../../config/.env" });
const sendMail = require("../../config/nodemailer");
const OTP = require('../../models/user_auth/OTP');
const otp = require('../../models/employer_model/sign_in_emp');
const Employer = require('../../models/employer_model/register');
const joi = require('joi');


exports.Loginuser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    let { error } = vali_sign_in({ email, password });
    if (error) res.status(400).json({ status: 0, message: error.details[0].message });

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) return res.status(404).json({
        status: 0,
        message: "invalid credentials"
    });

    const result = await bcrypt.compare(password, user.password);
    if (!result) return res.status(401).json({ status: 0, json: "invalid credentials" });


    const res1 = await OTP.create({ id: user._id, email: email });
    let mailcnf = await sendMail(res1);
    if (mailcnf.messageId) {
        res.status(200).json({ status: 1, message: "OTP sent your email" })
    }
});




exports.employer_login = asyncHandler(async (req, res) => {

    let { error, value } = sign_in_employer(req.body);
    if (error) return res.status(400).json({ status: 0, message: error.details[0].message });

    const data = await Employer.findOne({ email: value.email }).select(["_id", "email", "password"]);
    if (!data) return res.status(400).json({ status: 0, message: "User is not registered" });

    let result = await data.Verify_pass(value.password);
    if (!result) return res.status(400).json({ status: 0, message: "invalid credentials" });

    const cnfm = await otp.create({ id: data._id, email: data.email });
    const mailcnf2 = await sendMail(cnfm);

    if (mailcnf2.messageId) {
        res.status(200).json({ status: 1, message: "OTP sent to your email" });
    }


});





exports.verify_otp = asyncHandler(async (req, res) => {

    let { error, value } = joi.object({
        email: joi.string().email().required(),
        otp: joi.string().max(6).required()
    }).validate(req.body);

    if (error) return res.status(400).json({ status: 0, message: error.details[0].message });

    const result = await otp.findOne({ email: value.email, status: 1, otp: value.otp });
    if (!result) return res.status(400).json({ status: 0, message: "invalid credentials" });
    

    let result1= await result.verify_otp(value.otp);
    if(!result1) return res.status(400).json({status:0,message:"Invalid OTP"});

    let result2=await otp.findOneAndUpdate({email:value.email,status:1,otp:value.otp},{status:0});

    if(result2)
    return  res.status(200).json({status:1,message:"successfully logged in",token:result.Get_jwt()});

})

