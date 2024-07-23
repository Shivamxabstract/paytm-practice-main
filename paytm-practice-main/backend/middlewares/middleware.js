const { User } = require("../db");
const {verifyJwt } = require("../jwt");

async function authMiddleware(req,res,next) {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(404).json({
            msg: "Authorisation token not found"
        })
        return ;
    }

    const token = authHeader.split(" ")[1];

    try {        
    const userName = verifyJwt(token).userName;
    const user = await User.find({userName: userName});
    req.userId = user._id;
    next();
    } catch (error) {
        return res.status(403).json({msg:"wrong authorisation token"});
    }
}


module.exports = {authMiddleware}