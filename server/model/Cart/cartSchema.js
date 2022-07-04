const mongoose = require('mongoose');
const { stringify } = require('querystring');

const cartSchema = new mongoose.Schema({
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
    ]
},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps : true
});


const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;