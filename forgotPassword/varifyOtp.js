const User = require('../model/models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.otpVarify = async(req, res)=>{
    try{
        const {fixOtp} = req.body;

        const Userotp = await User.findOne({fixOtp : {$exists:true}});

        console.log("The whole user",Userotp);

        const varifyOtp = await bcrypt.compare(fixOtp, Userotp.fixOtp);
        console.log(varifyOtp);
        Userotp.fixOtp = undefined;
        await Userotp.save();

        if(!varifyOtp){
            return res.status(400).json({wrn:"your otp doesn't matched"})
        }else if(Userotp.expireOtp < Date.now()){
            return res.status(401).json({wrn:"Your otp has been expired"})
        }else{
            const randomToken = crypto.randomBytes(32).toString('hex');
            const expireToken = Date.now()+5*60*1000;
            
            
            Userotp.tokens = randomToken;
            Userotp.expToken = expireToken;
            await Userotp.save();

            const giveEmail = nodemailer.createTransport({
                service : "gmail",
                auth : {
                    user : "ecommerace67@gmail.com",
                    pass : "geif lwli ndvy ehgg"
                }
            })

            
            const resetLink = `http://localhost:5173/pass/${randomToken}`
            
            const sendHttp = await giveEmail.sendMail({
                from : "ecommerace67@gmail.com",
                to : Userotp.email,
                subject : "Send email for updating password",
                html: `<h1>Update Password</h1>
                <p>Your password has been reset successfully click <a href=${resetLink}> here </a> to update new password</p>
                `
            })
            return res.status(201).json({msg:"Congratulation! your otp has been matched, we sent another email for reset password", myOtp:varifyOtp, tkn:Userotp})
            
        }

        
    }
    catch(err){
        console.log(err);
    }
}