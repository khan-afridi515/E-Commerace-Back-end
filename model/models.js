const mongoose = require('mongoose');


const mongoSchema = new mongoose.Schema({
     username : String,
     fatherName : String,
     contact : String,
     email : String,
     password : String,
     address : String,
     img : String,
     fixOtp: String,
     expireOtp: String,
     tokens : String,
     expToken : String
}, {timestamps:true})


module.exports = mongoose.model('User', mongoSchema);