const Course=require("../models/course")
const Enrollment = require("../models/Enrollment")
const sendEmail=require("../utils/sendEmail")
exports.courseEnrollments=async(req,res)=>{
const courses=await Course.find().populate("instructor","name email")
res.status(200).json({
success:true,
courses,
})
}

exports.enrollInCourse=async(req,res)=>{
    try{
        const course=await Course.findById(req.params.courseId)
        if(!course){
            res.status(404).json({
                sucess:false,
                message:"Course not found"
            })}
        if(course.price>0)
        {
            res.status(400).json({
                sucess:false,
                message:"Paid course: Use payment route"
            })
        }
        console.log("Checking if already enrolled:");
console.log("User ID:", req.user.id);
console.log("Course ID:", course._id);
        const exists=await Enrollment.findOne({
            user:req.user.id,
            course:course._id
        })
        if(exists)
           return res.status(400).json({
        sucess:false,
        message:"Course already enrolled"
        })
        const newEnroll= await Enrollment.create(
            {
                user:req.user.id,
                course:course._id
            }
        )
        const emailContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #2e86de;">Enrollment Confirmation</h2>
    <p>Dear Student,</p>
    <p>Congratulations! You have successfully enrolled in <strong>${course.title}</strong>.</p>
    <p>This course will help you gain essential skills and move forward in your learning journey.</p>
    <p>We wish you all the best! If you have any questions, feel free to reach out to our support team.</p>
    <br />
    <p>Best Regards,<br />LMS Team</p>
  </div>
`;
        await sendEmail(req.user.email,"🎓 Enrollment Confirmed"+ course.title,emailContent)
        res.status(200).json({
            sucess:true,
            message:"enrolled",
            enrollment:newEnroll
        })
    }
    catch(err){
res.status(500).json({ success: false, message: "Enrollment failed", err });
    }
}
