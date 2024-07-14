const {JWT_SECRET}=require("../config");
const jwt=require("jsonwebtoken"); 
const bodyParser=require("body-parser");


const apple=async function adminmiddleware(req,res,next){
    const token=req.headers.authorization;
    const words=token.split(" ");
    const jwtToken=words[1];
    try{
    const decodeValue=jwt.verify(jwtToken,JWT_SECRET);
    
       await decodeValue.username
        next();

    }catch{
        res.status(403).json({
            msg:"you are not authorized"
        })
    }
}
module.exports=apple;


