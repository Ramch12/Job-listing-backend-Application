const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../config/.env" });


async function Sendmail(data) {
    try{

        const Transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.Email,
                pass: process.env.Password
            }
        });
    
        let options=
        {
            from: process.env.Email, 
            to: data.email, 
            subject:"OPT for reset Password",
            text:data.otp,   
        }
       const result=await Transport.sendMail(options);
       return result;
    }
    catch(err)
    {
        console.log(err.message);
    }
};

module.exports=Sendmail;
