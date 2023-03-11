const Job = require('../../models/jobs/jobs');
const { asyncHandler } = require('../../utils/asynchandler');

exports.get_single_job=asyncHandler(async(token_data,req,res)=>
{                  

                  let result=await Job.find({id:token_data._id});
                  if(!result) return res.status(404).json({status:0,message:"No job found"});
                  
                  res.status(200).json({status:1,message:result});             
});



exports.delete_job=asyncHandler(async(token_data,req,res)=>{

                 let result=await Job.deleteMany({id:token_data});
                 if(!result) return res.status(404).json({status:0,message:"No jobs found to delete"});

                 res.status(200).json({status:1,message:result});
});


