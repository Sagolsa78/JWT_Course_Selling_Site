const { Router } = require("express");
const {Admin}=require("../db/index");
const {Course}=require("../db/index");
const router=Router();
const apple=require("../middleware/admin")
const {JWT_SECRET}=require("../config");
const jwt=require("jsonwebtoken");
// const bodyParser=require("bodyParser");





router.post("/signup", async function(req,res){
    const {username,password}=req.headers;

    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        msg:"admin created successfully"
    })
})

router.post("/signin",async function(req,res){
    
  const username=req.headers.username;
  const password=req.headers.password;  

  console.log(JWT_SECRET);

 const user=await Admin.find({
        username,
        password
    })
    if(user){
        const token=jwt.sign({
            username
        },JWT_SECRET);
        res.json({
            token
        })
    }else{
        res.status.json({
            msg:"Incorrect username or password"
        })
    }

     

})
router.post("/courses",apple ,async function(req,res){
   
    const {title,description,price,imageLink}=req.body;
    try{
    const newcourse=await Course.create({
        title,
        description,
        price,
        imageLink

    })
    res.json({
        msg:"course created successfully ",courseId: newcourse._id
    })
  }catch{
    res.status(404).json({
        msg:"there was an error"
    })
  }
})

router.get("/courses",apple,async function(req,res){
    const response=await Course.find({});
    
    res.json({
        course:response
    })
    
    
})


module.exports=router;

