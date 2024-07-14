const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");


const userapple=function usermiddleware (req,res,next){
    const token=req.headers.authorization;
    const words=token.split(" ");
    const jwtToken=words[1];
    const decodeValue=jwt.verify(jwtToken,JWT_SECRET);
    if(decodeValue.username){
        req.username=decodeValue.username;
        next();

    }else{
        res.status(403).json({
            msg:"you are not authorized"
        })
    }
}



module.exports=userapple;

