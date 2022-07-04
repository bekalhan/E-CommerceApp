const Cart = require('../../model/Cart/cartSchema');
const expressAsyncHandler = require('express-async-handler');


/**Create cart */
const createCartCtrl = expressAsyncHandler(async (req,res)=>{
    const newCart = new Cart(req.body);

    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
});

/**update cart */
const updateCartCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCart);
      } catch (err) {
        res.status(500).json(err);
      }
});

/**delete cart */
const deleteCartCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
});

/**get user cart */
const getUserCartCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
});


/**get all */
const getAllCartCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = {createCartCtrl,updateCartCtrl,deleteCartCtrl,getUserCartCtrl,getAllCartCtrl};
