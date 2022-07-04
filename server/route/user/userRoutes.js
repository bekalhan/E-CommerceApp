const express = require('express');
const usersRoutes = express.Router();
const {userRegisterCtrl,userLoginCtrl,updateUserCtrl,deleteUserCtrl,getUserCtrl,getUserStatsCtrl,getAllUsersCtrl} = require('../../controller/User/userCtrl');
const {authmiddleware,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../middlewares/auth/authmiddleware');


//post request
usersRoutes.post('/api/users-register',userRegisterCtrl);
usersRoutes.post('/api/users-login',userLoginCtrl);

//put request
usersRoutes.put('/api/users-update/:id',authmiddleware,updateUserCtrl);

//delete request
usersRoutes.delete('/api/users-delete/:id',authmiddleware,deleteUserCtrl);

//get request
usersRoutes.get('/api/user/:id',authmiddleware,getUserCtrl);
usersRoutes.get('/api/users',authmiddleware,getAllUsersCtrl);
usersRoutes.get('/api/user/stats',authmiddleware,getUserStatsCtrl);


module.exports = usersRoutes;