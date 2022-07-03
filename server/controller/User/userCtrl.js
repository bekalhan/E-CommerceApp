const User = require('../../model/User/userSchema');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../config/token/generateToken')


/*Register*/
const userRegisterCtrl = expressAsyncHandler(async (req,res)=>{
    console.log(req.body);
    const userExist = await User.findOne({email : req?.body?.email});

    if(userExist) throw new Error("User already exist");
    try{
    const user = await User.create({
        username : req?.body?.username,
        email : req?.body?.email,
        password : req?.body?.password
    });
    res.json(user);
    }catch(err){
        res.json(err);
    }
})

//login user

const userLoginCtrl = expressAsyncHandler(async (req,res)=>{
    try{
    const {email,password} = req.body;
    const userFound = await User.findOne({email});
    if(userFound && (await userFound.matchPassword(password))){
        res.json({
            _id : userFound?._id,
            username : userFound?.firstname,
            email : userFound?.email,
            isAdmin : userFound.isAdmin,
            token :generateToken(userFound?._id),
        })
    }else{
        res.status(401);
        throw new Error("invalid credentials")

    }
}catch(err){
    res.json(err);
}
})


module.exports = {userRegisterCtrl,userLoginCtrl};