const User = require('../model/models');
const bcrypt = require("bcryptjs");
const  jwt = require("jsonwebtoken");
const fileOnCloud = require('../cloud');


// exports.createnewUser = async(req, res)=>{
//     try{
//         const {username, email, password} = req.body;

//         console.log("mybody",req.body)
    
//           const existEmail = await User.findOne({email})
//         if(existEmail){
//             return res.status(404).json({wrn:"Email allready regestered"})
//         }
       
//         const hashpassword = await bcrypt.hash(password,10);
//         const freshUser = await User.create({username, email, password: hashpassword})

//         const newUser = freshUser.toObject();
//         return res.status(200).json({msg:"password encrypted successfuly", user: newUser})

//         // const newuser = await User.create(req.body);
//         // return res.status(201).json({msg:"successful",user:newuser})
//     }
//     catch(err){
//         console.log(err);
//     }
// }



exports.createClient = async(req, res) =>{
    try{
        const {username, fatherName, contact, email, password, address} = req.body;

        let imgUrl = " ";

        if(req.file){
            let pic = await fileOnCloud(req.file.path);
            imgUrl = pic.secure_url;
        }

        const setEmail = await User.findOne({email});
        
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await User.create({username, fatherName, contact, email, password:hashPass, address, img:imgUrl})
        
        if(!newUser) return res.status(400).json({wrn:"User did not found"})
        
        return res.status(200).json({msg:"Congratulation! Your form has successfully submitted", user:newUser})
    }
    catch(err){
        console.log(err);
    }
    
}

exports.deleteAll = async(req, res)=>{
    try{

        await User.deleteMany({});
        const allMembers = await User.find();

        res.status(200).json({msg:"All user removed", myDb:allMembers})
    }
    catch(err){
        console.log(err);
    }
}


exports.getAlluser = async(req, res)=>{
    try{
       const allUser= await User.find();
       if(!allUser){
        return res.status(400).json({wrn:'data not found'})
       }
       res.status(200).json({msg:"Data found",users:allUser})
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteuser = async(req,res)=>{
    try{
        const userId = req.params.user_Id;
        const dltuser = await User.findByIdAndDelete(userId);
        if(!dltuser) return res.status(404).json({wrn:"Data not found"})
        return res.status(201).json({msg:"Data deleted successfully",dltData:dltuser})
        
    }
    catch(err){
        console.log(err);
    }
}

exports.updateUser = async(req, res)=>{
    try{
        const user_id = req.params.userId;
        const {username} = req.body;

        if(!username) return res.status(400).json({wrn:"please enter name!"})
        
        let imageUrl = " ";
        if(req.file){
           const paths = await fileOnCloud(req.file.path);
           imageUrl = paths.secure_url;
        }

        const newData = {
          username:username,
          img:imageUrl
        }

        const updateuser = await User.findByIdAndUpdate(user_id,newData,{new:true})
        if(!updateuser) return res.status(404).json({wrn:"Data not  found"})
            return res.status(202).json({msg:"data successfully updated",updateData:updateuser})
    }
    catch(err){
        console.log(err);
    }
}

exports.getSpecificId = async(req, res)=>{
    try{
        const user_Id = req.params.userId;
        const getId = await User.findOne({_id:user_Id})
    
        if(!getId) return res.status(404).json({wrn:"Data Not Found"})
            return res.status(200).json({msg:"Data successfully found", Data:getId})
    }
    catch(err){
        console.log(err);
    }
   
}

exports.authRoute = async(req, res) =>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
        if(!email) return res.status(400).json({wrn:"Enter email!"});
        if(!password) return res.status(400).json({wrn:"Enter password"})

        const findEmail = await User.findOne({email});
        if(!findEmail) return res.status(401).json({wrn:"invalid Email"});

        const findPassword = await bcrypt.compare(password, findEmail.password);
 
        if(!findPassword) return res.status(401).json({wrn:"Password does not match"});
        
        const wholeData = await User.find();
        const login_user_token = await jwt.sign(
            {
                userId : findEmail._id,
                userName : findEmail.username,
                email: findEmail.email, 
                father: findEmail.fatherName,
                contact: findEmail.contact,
                address:findEmail.address
            },
            "abcd4342346%#$^8*",
            { expiresIn: '1d'}
        );

        return  res.status(200).json({msg:"User found", LoginUser:findEmail, userToken:login_user_token, person:wholeData })
    }
    catch(err){console.log(err)}
    
}

exports.authenticMiddleware = async(req,res,next)=>{
    try{
        const varifiedToken = req.headers['token'];
        console.log('auth middle : ',varifiedToken);
        console.log('authmiddle ware');
        console.log("virify", varifiedToken);
        
        if(!varifiedToken)return res.status(400).json({wrn:"Token not found"})
    
        const isVarified = await jwt.verify(varifiedToken, "abcd4342346%#$^8*")
    
        if(!isVarified) return res.status(400).json({wrn:"User not found"})
    
            req.user =isVarified;
            next();
    }
    catch(err){
        console.log(err);
    }
   
}





