const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required :true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
    },
    isAdmin :{
        type : Boolean,
        default : false,
    },
},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps : true
});


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
}

const User = mongoose.model("User",userSchema);

module.exports = User;