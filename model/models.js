const mongoose = require('mongoose');


const mongoSchema = new mongoose.Schema({
     username : String,
     fatherName : String,
     contact : String,
     email : String,
     password : String,
     address : String,
     img : String
}, {timestamps:true})


module.exports = mongoose.model('User', mongoSchema);