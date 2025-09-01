const express = require('express');
const routes = express.Router();
const {createClient ,getAlluser, deleteuser, updateUser, getSpecificId, authRoute, authenticMiddleware, deleteAll} = require('../controller/control');

//const {createnewUser} = require('../controller/control');
//createnewUser
// createnewUser

routes.post('/postUser', createClient);
routes.get('/getAlluser', getAlluser);
routes.delete('/dltUser/:user_Id', deleteuser);
routes.put('/updateUser/:userId', updateUser);
routes.get('/get_Id/:userId',getSpecificId);
routes.post('/login',authRoute);
routes.get('/authMiddle', authenticMiddleware)
routes.delete('/allDeleete', deleteAll);

module.exports = routes;