const mongoose = require('mongoose');
const apply_job = mongoose.model('job_aplication', new mongoose.Schema({
    id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'job'
    }
}));

module.exports=apply_job;