const express = require('express');
const routes = express.Router();
const {createClient ,getAlluser, deleteuser, updateUser, getSpecificId, authRoute, authenticMiddleware, deleteAll} = require('../controller/control');
const upload = require('../multer');
const { CreateOtp } = require('../forgotPassword/createOtp');
const { otpVarify } = require('../forgotPassword/varifyOtp');
const { changePass } = require('../forgotPassword/updatePass');


//const {createnewUser} = require('../controller/control');
//createnewUser
// createnewUser

routes.post('/postUser', upload.single("img"), createClient);
routes.get('/getAlluser', getAlluser);
routes.delete('/dltUser/:user_Id', deleteuser);
routes.put('/updateUser/:userId', upload.single("img"), updateUser);
routes.get('/get_Id/:userId',getSpecificId);
routes.post('/login',authRoute);
routes.get('/authMiddle', authenticMiddleware)
routes.delete('/allDeleete', deleteAll);
routes.post('/makeOtp', CreateOtp);
routes.post('/checkOtp', otpVarify);
routes.put("/setPass/:tokens", changePass);

module.exports = routes;