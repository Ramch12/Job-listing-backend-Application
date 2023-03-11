const User = require('../../models/user_auth/user');
const { vali_sign_up } = require('../../Validate/validate');
const _ = require('lodash')
const moment = require('moment-timezone');
const { asyncHandler } = require('../../utils/asynchandler');
const jwt = require('jsonwebtoken');
require('dotenv').config('../../config/.env');
const  Employer = require('../../models/employer_model/register');
const { sign_up_employer } = require('../../Validate/validate');

exports.createUser = asyncHandler(async (req, res) => {
    const data = req.body;

    const { error } = vali_sign_up(data);
    if (error) return res.status(400).json({ "message": error.details[0].message, status: 0 });

    const { first_name, last_name, email, password, phone_no } = data;

    const al_present = await User.find({ email });
    if (al_present.length) return res.status(400).json({ status: 0, message: "user is already registered" });

    const user = await User.create({ first_name, last_name, email, password, phone_no });

    const token = user.Getjwttoken();
    res.status(201).json({ user: _.pick(user, ['first_name', 'last_name', 'email']), status: 1, token: token });


});


exports.createEmpl = asyncHandler(async (req, res) => {

    let { error, value } = sign_up_employer(req.body);
    if (error) return res.status(400).json({ status: 0, message: error.details[0].message });


    let E_data = {
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        phone: value.phone,
        password:value.password
    }
    

    let data=await Employer.findOne({email:E_data.email});
    if(data) return res.status(400).json({status:0,message:"Employer is already registerd"});

    let emp_data = await Employer.create(E_data);
    return res.status(201).json({status:1,token:emp_data.Get_jwt_token(),message:"successfully registered",employer:_.pick(emp_data,["first_name","last_name","email,phone"])});

});


