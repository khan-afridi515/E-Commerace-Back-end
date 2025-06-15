
//db.js
const mongoose = require('mongoose');
const dbUrl = "....."
const connectDB = async() => {
    try{
        await mongoose.connect(dbUrl);
        console.log("db connected")
    }
    catch(err){
        console.log(err);
    }
}


//model.js

const  mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
},{timestamps : true})

module.exports = mongoose.model("user",userSchema);



//control.js

const user = require('path');


exports.postUser = async(req, res)=>{
    try{
        const {username, email, password} = req.body
       const allnewUser = await user.create(req.body);
       return res.status(200).json({msg:"data founded",data:allnewUser})
    }
    catch(err){
        console.log(err);
    }
    
}

