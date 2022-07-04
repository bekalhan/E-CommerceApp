const express = require('express');
const orderRoutes = express.Router();
const {authmiddleware,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../middlewares/auth/authmiddleware');
const {createOrderCtrl,updateOrderCtrl,deleteOrderCtrl,getOrderCtrl,getAllOrderCtrl,incomeOrderCtrl} = require('../../controller/Order/orderController');

//post request
orderRoutes.post('/api/new-order',authmiddleware,createOrderCtrl);

//put request
orderRoutes.put('/api/update-order/:id',authmiddleware,updateOrderCtrl);

//delete request
orderRoutes.delete('/api/delete-order/:id',authmiddleware,deleteOrderCtrl);

//get request
orderRoutes.get('/api/order/:id',authmiddleware,getOrderCtrl);
orderRoutes.get('/api/order',authmiddleware,getAllOrderCtrl);
orderRoutes.get('/api/income',authmiddleware,incomeOrderCtrl);

module.exports = orderRoutes;