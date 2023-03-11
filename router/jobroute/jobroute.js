const express = require('express');
const jobroute = express.Router();
const { createJob } = require('../../controller/Jobs/job');
const { list_all_jobs } = require('../../controller/Jobs/job');
const { getSingle } = require('../../controller/Jobs/job');
const { App_job } = require('../../controller/Jobs/job');
const { varify_tkn } = require('../../middleware/verify_token');
const { get_single_job } = require('../../controller/CRUD/CRUD_Job');
const { delete_job } = require('../../controller/CRUD/CRUD_Job');


jobroute
    .route('/createjob')
    .post(varify_tkn, createJob);

jobroute
    .route('/get_job')
    .get(varify_tkn, get_single_job);


jobroute
    .route('/delete_job')
    .get(varify_tkn, delete_job);


jobroute
    .route('/getalljobs')
    .get(list_all_jobs)


jobroute
    .route('/getsinglejob/:id')
    .get(getSingle);


jobroute
    .route('/apply_for_job')
    .post(App_job)

module.exports = jobroute;