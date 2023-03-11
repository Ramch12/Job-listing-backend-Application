const Job = require('../../models/jobs/jobs');
const { asyncHandler } = require('../../utils/asynchandler');
const errorResponse = require('../../utils/errorResponse');
const apply_job=require('../../models/jobs/job_apply');

module.exports.createJob = asyncHandler(async (token_data,req, res) => {
    req.body.id=token_data.id;
    const { id,title, company, location, description, requirements, salary, applylink} = req.body;

    const result = await Job.create({id,title, company, location, description, requirements, salary, applylink });
    res.status(201).json({Message:"You posted a Job",job:result});
})


module.exports.list_all_jobs = asyncHandler(async (req, res, next) => {
    const allJobs = await Job.find();
    if (!allJobs) return next(
        new errorResponse("No jobs are available", 404)
    )
    res.status(200).send(allJobs);
});


module.exports.getSingle = asyncHandler(async (req, res, next) => {

    const id = req.params.id
    const result = await Job.findById(id);

    if (!result) return next(new errorResponse(`jobs are not found with the id ${req.params.id}`,404));
    res.status(200).send(result);
});


module.exports.App_job=asyncHandler(async(req,res)=>{
           
           const {id}=req.body;
        //    console.log(id,req.body);
           const result=await apply_job.create({id});
           console.log(result);
           if(result) 
           {
            const job=await apply_job.findById(result._id).populate('id')
            return res.status(201).json({message:{message:"You have applied for the job",job:job}});
           }
})







