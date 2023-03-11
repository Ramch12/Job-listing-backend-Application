const {asyncHandler}=require('../../utils/asynchandler');
const OTP=require('../../models/user_auth/OTP');

exports.match_otp=asyncHandler(async(req,res,next)=>
{   
    const {email,otp}=req.body
    const user=await OTP.find({email:email,status:1}).populate('id');
    

    if(!user) return res.status(401).json({succes:false,message:'invalid credentials'});

    if(parseInt(user[0].otp!=otp)) return res.status(401).json({status:0,message:"incorrect OTP"});

    let token=user[0].id.Getjwttoken();
    res.status(200).json({succes:true,token:token});
});