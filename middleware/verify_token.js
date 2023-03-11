// const {asyncHandler}=require('../utils/asynchandler');
require('dotenv').config({ path: "../config/.env" });
const jwt = require('jsonwebtoken');


exports.varify_tkn = async (req, res, next) => {
  try {
    let token = req.header('x-auth-token');

    if (!token) return res.status(401).json({ status: 0, message: "please provide a token" });

    let token_data = jwt.verify(token, process.env.Private_key);

    if (!token_data) return res.status(401).json({ status: 0, message: "please provide a valid token" });

    //   console.log(token_data._id);

    next(token_data);
  }
  catch (err) {
    next(err);
  }

}