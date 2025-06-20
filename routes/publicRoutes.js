const Course=require("../models/course")
const express=require("express")
const router=express.Router()

router.get("/courses",async (req,res)=>{
    try{
const courses=await Course.find().select("title price instructor thumbnail")
res.json({success:true,courses})
    }
    catch(err){
res.status(500).json({ success: false, message: "Server Error" });
    }
})
module.exports=router