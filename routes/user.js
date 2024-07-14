const {Router}=require("express");
const {User,Course}=require("../db/index");
const express =require("express");
const router=Router();
const userapple=require("../middleware/user");
const { JWT_SECRET } = require("../config");
const jwt =require("jsonwebtoken");





router.post("/signup",async function(req,res){
    const username=req.headers.username;
    const password=req.headers.password;
    try{
        const newuser=new User({
            username:username,
            password:password
        })

        await newuser.save();

        res.json({
            msg:"user created successfully"
        })
    }catch{
        res.json({
            msg:"error while creating new user"
        })
    }


})


router.post("/signin",async function(req,res){
    const {username,password}=req.headers;
    const user=await User.find({
        username:username,
        password:password
    })
    if(user){
        const token = jwt.sign({
            username
        },JWT_SECRET)

        res.json({
            token
        })
    }else{
        res.status(404).json({
            msg:"incorrect id or password "
        })
    }

})


router.get("/courses",userapple ,async function(req,res){
  
    const response=await Course.find({

    })
    res.json({
        response
    })
})


router.post("/courses/:courseId",userapple,async function(req,res){
    const username= req.username;
    const courseId=req.params.courseId
    try{
       await User.updateOne({
            username:username
        },{
            "$push":{purchasedCourse:courseId}
        })

        res.json({
            msg:"purchased completed"
        })

    }catch{
        res.json({
            msg:"there was an error "
        })
    

    }
    
    

})

router.get("/purchasedCourse",userapple,async function(req,res){
    const user=await User.findOne({
        username:req.username
    })
    // console.log(user);
    const course=await Course.find({
        _id:{
            "$in":user.purchasedCourse
            
        }
    });

    res.json({
        course:course
    })
})



module.exports=router;
