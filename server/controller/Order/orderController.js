const Order = require('../../model/Order/orderSchema');
const expressAsyncHandler = require('express-async-handler');


/**create new order */
const createOrderCtrl = expressAsyncHandler(async (req,res)=>{
    const newOrder = new Order(req.body);

    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
});


/**update order */
const updateOrderCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedOrder);
      } catch (err) {
        res.status(500).json(err);
      }
});


/**delete order */
const deleteOrderCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
});

/**get order */
const getOrderCtrl = expressAsyncHandler(async (req,res)=>{
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
});

/**get all orders */
const getAllOrderCtrl = expressAsyncHandler(async (req,res) =>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
});

//get montly ıncome

const incomeOrderCtrl = expressAsyncHandler(async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

module.exports = {createOrderCtrl,updateOrderCtrl,deleteOrderCtrl,getOrderCtrl,getAllOrderCtrl,incomeOrderCtrl};