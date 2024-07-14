const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sahanimohit5ed:xdXDthveqiLf1RbP@cluster0.s3od1pp.mongodb.net/jwt_Course_selling_website");

const AdminSchema=new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});

const courseSchema=new mongoose.Schema({
     title: String, 
     description:String, 
     price: Number,
     imageLink:String

});


const Admin =mongoose.model("Admin",AdminSchema);
const User = mongoose.model("User",UserSchema);
const Course= mongoose.model("Course",courseSchema);


module.exports={
    Admin,
    User,
    Course
}

// console.log(Admin ,typeof Admin);

