require('dotenv').config({path:'../config/.env'});
const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://root1:root1@cluster0.wbwtmpk.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("successfully connected".red);
})
.catch((error)=>{
    console.log('failed to connect due to',error.message);
});