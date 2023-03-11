const express = require('express');
const authroute = express.Router();
const { createUser } = require('../../controller/auth/sign_up');
const { Loginuser } = require('../../controller/auth/sign_in');
const { match_otp } = require('../../controller/auth/match_otp');
const { varify_tkn } = require('../../middleware/verify_token');
const { get_single_user } = require('../../controller/auth/get_user_details');
const { createEmpl } = require('../../controller/auth/sign_up');
const { employer_login } = require('../../controller/auth/sign_in');
const {verify_otp}=require('../../controller/auth/sign_in');

authroute
    .route('/sign_up')
    .post(createUser);



authroute
    .route('/sign_in')
    .post(Loginuser);



authroute
    .route('/match_otp')
    .post(match_otp);


authroute
    .route('/individual_user')
    .get(varify_tkn, get_single_user);


authroute
    .route('/createEmpl')
    .post(createEmpl);


authroute
    .route('/login_Empl')
    .post(employer_login)


authroute
    .route('/verify_otp')
    .post(verify_otp)



module.exports = authroute;