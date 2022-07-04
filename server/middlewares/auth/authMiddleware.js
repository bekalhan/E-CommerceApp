const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../model/User/userSchema');

const authmiddleware = expressAsyncHandler(async (req,res,next)=>{
    let token;

    if(req?.headers.authorization?.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            if(token){
                const decoded = jwt.verify(token,process.env.JWT_KEYS);
                const user = await User.findById(decoded?.id).select("-password");
                req.user = user;
                next();
            }
        }catch(err){
            throw new Error("not authorized");
        }
    }
});


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

module.exports = {authmiddleware,verifyTokenAndAdmin,verifyTokenAndAuthorization};