const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
        unique : true
    },
    desc:{
        type : String,
        required : true,
    },
    img:{
        type : String,
        required : true
    },
    categories :{
        type : Array
    },
    size : {
        type : String
    },
    color : {
        type : String
    },
    price:{
        type : Number,
        required : true
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

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
