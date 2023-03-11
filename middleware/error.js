const errorResponse = require('../utils/errorResponse');
const logger=require('../winston/winston');

module.exports = (err, req, res, next) => {
    let error = {...err};

    console.log(err);

    error.message=err.message;

    if (err.name === 'CastError') {
        let message = `jobs are not found with the id ${err.value}`
        error = new errorResponse(message, 404);
    }

    logger.log({level:'error',message:error.message});
    res.status(error.status || 500).json({ "message": error.message || "Server Error", status: error.status });

} 