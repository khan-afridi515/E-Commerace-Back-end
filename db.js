const mongoose = require('mongoose');
//const dbUrl = 'mongodb+srv://ecommerece:admin11@cluster0.swircm7.mongodb.net/E-commerace';
const dbUrl2 = 'mongodb+srv://ecommerece:admin11@cluster0.swircm7.mongodb.net/E-commerace'
const dbUrl3 = 'mongodb+srv://uaziz9164:arsalan234@cluster0.6akhfrd.mongodb.net/landing Page'
const connectDB = async() =>{
    try{
        await mongoose.connect(dbUrl2);
        console.log("db Connected");
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB;