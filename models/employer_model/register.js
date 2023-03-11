const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');


let validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const emp_schema = new mongoose.Schema({
    first_name:
    {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    last_name:
    {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email:
    {
        type: String,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        min: 10,
        max: 255,
        require: true
    },
    phone: {
        type: Number,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
});

emp_schema.pre('save', async function (next) {
    let salt =await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


emp_schema.methods.Get_jwt_token=function(){
         return jwt.sign({_id:this._id},process.env.Priate_key)
};

emp_schema.methods.Verify_pass=async function(password)
{
    return await bcrypt.compare(password,this.password);
}

const Employer = mongoose.model('employer', emp_schema);
module.exports = Employer;