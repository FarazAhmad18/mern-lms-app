const Course=require("../models/course")

exports.courseEnrollments=async(req,res)=>{
const courses=await Course.find().populate("instructor","name email")
res.status(200).json({
success:true,
courses,
})
}