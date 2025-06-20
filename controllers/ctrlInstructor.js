const Course=require("../models/course")
const Lesson=require("../models/Lesson")
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
    // console.log("Course Created:", course);
}
catch(err)
{
 res.status(500).json({ success: false, message: "Server error", error: err });
}
}

exports.getMyCourses=async(req,res)=>{
    try{
const courses=await Course.find({instructor:req.user.id})
res.status(200).json({
     success: true, courses 
})
    }
    catch(err){
  res.status(500).json({ success: false, message: "Server Error" });
    }
}

exports.updateCourse=async(req,res)=>{
    try{
        const {id}=req.params
const updatedCourse=await Course.findOneAndUpdate({_id:id,instructor:req.user.id},
    req.body,
    {new:true}
)
res.status(200).json({ success: true, updatedCourse,message:"course updated" });
    }
    catch(err){
    res.status(500).json({ success: false, message: "Server Error" });
    }
}

exports.deleteCourse=async(req,res)=>{
    try{
        const {id}=req.params;
        // console.log("Deleting course with ID:", id, "by user:", req.user.id);
const delCourse=await Course.findOneAndDelete({_id:id,instructor:req.user.id})
if (!delCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized",
      });
    }
res.status(200).json({ success: true, delCourse,message:"course deleted" });
    }
    catch(err)
    {
       res.status(500).json({ success: false, message: "Server Error" });
 
    }
}

exports.addLesson=async(req,res)=>
{try
    {const{courseId,title,content,videoUrl,order}=req.body
const newLesson=await Lesson.create({
course:courseId,
title,content,videoUrl,order
})
 res.status(201).json({ success: true, newLesson });
}
catch(err){
     res.status(500).json({ success: false, message: "Lesson upload failed", err });
}
}
