const mongoose = require('mongoose');

const orderSchema = new mpongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    products:[
        {
        productId :{
            type : String
        },
        quantity:{
            type : Number,
            default:1
        }
    }
    ],
    amount :{
        type : Number,
        required : true
    },
    address :{
        type : Object,
        required : true
    },
    status :{
        type : String,
        default : "pending"
    }
},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps : true
});


const Order = mongoose.model('Order',orderSchema);

mpodule.exports = Order;