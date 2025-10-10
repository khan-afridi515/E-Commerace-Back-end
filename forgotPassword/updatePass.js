const User = require("../model/models");
const bcrypt = require('bcrypt');

exports.changePass = async(req, res) => {
    try{
        const {tokens} = req.params;
        const {password} = req.body;

        const tokenUser = await User.findOne({tokens});
        console.log(tokenUser);
        tokenUser.tokens = undefined;
        tokenUser.expToken = undefined;
        await tokenUser.save();

        if(!tokenUser){
            return res.status(400).json({wrn:"data does not found!"})
        }else if(tokenUser.expToken < Date.now()){
            return res.status(401).json({wrn:"Your token has been expired!"});
        }else{
            const hashedpassword = await bcrypt.hash(password, 10);
            tokenUser.password = hashedpassword;
            await tokenUser.save();

            return res.status(200).json({msg:"Congratulation! Your password has successfully been updated!", ourUser:tokenUser})
        }
        
    }
    catch(err){
        console.log(err)
    }
}