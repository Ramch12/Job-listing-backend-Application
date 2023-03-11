// const errorResponse=require('../../utils/errorResponse');
module.exports.asyncHandler=(handler)=>{
        return async(token_data,req,res,next)=>
        {
            try{
               await handler(token_data,req,res);
            }
            catch(error)
            {
                next(error);
            }
        }
}