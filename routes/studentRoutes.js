const express=require("express")
const {auth}=require("../middlewares/auth")
const {hasRole}=require("../middlewares/hasRole")
const studentCtrl=require("../controllers/studentCtrl")
const { attemptExam } = require("../controllers/examController");
const {markLessonComplete}=require("../controllers/progressController")
const router=express.Router();

router.use(auth);
router.use(hasRole("student")) 

router.get("/my-enrollments",studentCtrl.courseEnrollments)
router.post("/enroll/:courseId",studentCtrl.enrollInCourse)

router.post("/complete-lesson", markLessonComplete);
router.post("/attempt-exam", attemptExam);
module.exports=router
