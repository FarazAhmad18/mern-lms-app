const Course=require("../models/course")

exports.createCourse=async (req,res)=>{
try{
    const {title,description,price,category}=req.body
    const course=await Course.create({
        title,description,price,category,
        instructor:req.user.id
    })
    res.status(201).json({
        success:true,
        message:"course created sucessfully",
        course
    })
}
catch(err)
{
 res.status(500).json({ success: false, message: "Server error", error: err });
}
}