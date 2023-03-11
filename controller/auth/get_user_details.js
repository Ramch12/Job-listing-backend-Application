const User=require('../../models/user_auth/user');
require('dotenv').config({path:"../../config/.env"});

exports.get_single_user=async function(token_data,req,res,next){
                      try{
                          const user=await User.findById(token_data._id);
                          
                          if(!user) res.status(404).json({status:0,message:"User not found"});
    
                          res.status(200).json({status:1,user:user});
                      }
                      catch(err)
                      {
                        console.log(err.message);
                      }
}