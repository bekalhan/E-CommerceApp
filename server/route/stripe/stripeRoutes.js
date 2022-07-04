const express = require('express');
const stripeRoutes = express.Router();
const {authmiddleware,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../middlewares/auth/authmiddleware');
const {paymentCtrl} = require('../../controller/Stripe/stripeController');


//post request
stripeRoutes.post('/api/payment',paymentCtrl);




module.exports = stripeRoutes;