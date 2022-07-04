const express = require('express');
const cartRoutes = express.Router();
const {authmiddleware,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../middlewares/auth/authmiddleware');
const {createCartCtrl,updateCartCtrl,deleteCartCtrl,getUserCartCtrl,getAllCartCtrl} = require('../../controller/Cart/cartController');


//post request
cartRoutes.post('/api/new-cart',authmiddleware,createCartCtrl);

//put request
cartRoutes.put('/api/update-cart/:id',authmiddleware,updateCartCtrl);

//delete request
cartRoutes.delete('/api/delete-cart/:id',authmiddleware,deleteCartCtrl);

//get request
cartRoutes.get('/api/cart/:id',authmiddleware,getUserCartCtrl);
cartRoutes.get('/api/cart',authmiddleware,getAllCartCtrl);


module.exports = cartRoutes;