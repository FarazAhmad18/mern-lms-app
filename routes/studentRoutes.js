const express=require("express")
const {auth}=require("../middlewares/auth")
const {hasRole}=require("../middlewares/hasRole")
const studentCtrl=require("../controllers/studentCtrl")

const router=express.Router();

router.use(auth);
router.use(hasRole("student")) 

router.get("/my-enrollments",studentCtrl.courseEnrollments)
router.post("/enroll/:courseId",studentCtrl.enrollInCourse)
module.exports=router
