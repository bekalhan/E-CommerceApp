const express = require('express');
const userRoutes = express.Router();
const authmiddleware = require('../../middlewares/auth/authMiddleware');
const {userRegisterCtrl,userLoginCtrl} = require('../../controller/User/userCtrl');

//post request
userRoutes.post('/api/users-register',userRegisterCtrl);
userRoutes.post('/api/users-login',userLoginCtrl);





module.exports = userRoutes;