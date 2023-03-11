const winston = require('winston');

const logger = winston.createLogger({

    transports: [
        new winston.transports.File({ filename: './winston/error.log', level: 'error' }),
        new winston.transports.File({ filename: './winston/result.log', level: 'info' }),
    ]

});
module.exports=logger;
