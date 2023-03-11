const express=require('express');
const app=express();
require('./config/connect');
require('dotenv').config({path:'./config/.env'});
const authrouter=require('./router/authroute/authroute');
const jobroute=require('./router/jobroute/jobroute');
require('colors');
const error=require('./middleware/error');


app.use(express.json());
app.use('/auth',authrouter);
app.use('/job',jobroute);
app.use(error);


app.listen(process.env.PORT,()=>{
    console.log(`your application is running on port ${process.env.PORT}...`.green);
})
