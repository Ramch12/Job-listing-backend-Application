const mongoose = require('mongoose');
const jobschema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'please add a job title'],
    },
    company: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'please add a company name']
    },
    location: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'Please a add a company location']
    },
    description: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'Please a add a job description']
    },
    requirements: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'Please a add a job requirement']
    },
    salary: {
        type: Number,
        required: [true, 'Please a add salary']
    },
    applylink: {
        type: String,
        min: 5,
        max: 255,
        required: [true, 'Please a add a applylink']
    }
});

module.exports = mongoose.model('job', jobschema);
