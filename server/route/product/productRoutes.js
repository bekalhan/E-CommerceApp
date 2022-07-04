const express = require('express');
const productRoutes = express.Router();
const {authmiddleware,verifyTokenAndAdmin,verifyTokenAndAuthorization} = require('../../middlewares/auth/authmiddleware');
const {createProductCtrl,updateProductCtrl,deleteProductCtrl,getAllProductCtrl,getProductCtrl} = require('../../controller/Product/productCtrl');

//post request
productRoutes.post('/api/new-product',authmiddleware,createProductCtrl);

//put request
productRoutes.put('/api/update-product/:id',authmiddleware,updateProductCtrl);

//delete request
productRoutes.delete('/api/delete-product/:id',authmiddleware,deleteProductCtrl);

//get request
productRoutes.get('/api/products',authmiddleware,getAllProductCtrl);
productRoutes.get('/api/product/:id',authmiddleware,getProductCtrl)



module.exports = productRoutes;