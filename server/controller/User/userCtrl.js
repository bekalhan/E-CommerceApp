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
    console.log("login");
    try{
    const {email,password} = req.body;
    const userFound = await User.findOne({email});
    console.log("user",userFound);
    if(userFound && (await userFound.matchPassword(password))){
        console.log("a");
        res.json({
            _id : userFound?._id,
            username : userFound?.username,
            email : userFound?.email,
           isAdmin : userFound.isAdmin,
           token :generateToken(userFound?._id),
        })
        console.log("b");
    }else{
        res.status(401);
        throw new Error("invalid credentials")

    }
}catch(err){
    console.log("error");
    res.json(err);
}
});


/***Updata user */
const updateUserCtrl = expressAsyncHandler(async (req,res) =>{
    const {id} = req.params;
    try{
    const user = await User.findByIdAndUpdate(id,{
        $set:req.body
    },{
        new : true,
        runValidators:true
    });
    res.json(user);
}catch(err){
    res.json(error);
}

});


/***Delete user */
const deleteUserCtrl = expressAsyncHandler(async (req,res) =>{
    const {id} = req.params;
    try{
        const deleteduser = await User.findByIdAndDelete(id);
        console.log("b");
        res.json(deleteduser);
    }catch(err){
        res.json(error);
    }
});


/***Get user ***/
const getUserCtrl = expressAsyncHandler(async (req,res) =>{
    const {id} = req.params;

    try{
        const user = await User.findById(id);
        res.json(user);
    }catch(error){
        res.json(error);
    }
});

/**Get all users */
const getAllUsersCtrl = expressAsyncHandler(async (req,res) =>{
    try{
        const users = await User.find({});
        res.json(users);
    }catch(error){
        res.json(error)
    }
});

/**Get user stats */
const getUserStatsCtrl = expressAsyncHandler(async (req,res) =>{
    const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }

})



module.exports = {userLoginCtrl,userRegisterCtrl,updateUserCtrl,deleteUserCtrl,getUserCtrl,getUserStatsCtrl,getAllUsersCtrl};




