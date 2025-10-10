const User = require("../model/models");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.CreateOtp = async(req, res) =>{
    try{
      const {email} = req.body;

      const EmailUser = await User.findOne({email});

      if(!EmailUser){
        return res.status(400).json({wrn:"Your email doesn't match"});
      }

      const otpCode = Math.floor(100000+Math.random()*900000).toString();
      const hashOtp = await bcrypt.hash(otpCode, 10);

      EmailUser.fixOtp = hashOtp;
      EmailUser.expireOtp = Date.now() + 5 * 60 * 1000;
      await EmailUser.save();

      
      const emailarea = `http://localhost:5173/otp`
      // const emailarea = "http://localhost:5173/email"

      console.log("my otp from create", otpCode);

      const myEmail = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "ecommerace67@gmail.com",
            pass : "geif lwli ndvy ehgg"
        }
      })

      const info = await myEmail.sendMail({
        from : "ecommerace67@gmail.com",
        to: EmailUser.email,
        subject : "send email for verification",
        html : `<h1>Verification for otp</h1>
        <p>This is your otp code ${otpCode}</p>
        <p>Click here <a href=${emailarea}>here</a></p>
        `
      })

      return res.status(200).json({msg:"Your email has been matched, an email sent to your account check your inbox or spam in your account", user:EmailUser})

      
    }
    catch(err){
           console.log(err);
    }
}