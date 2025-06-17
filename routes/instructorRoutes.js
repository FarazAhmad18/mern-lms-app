const express=require("express")
const {auth}=require("../middlewares/auth")
const {hasRole}=require("../middlewares/hasRole")
const ctrlInstructor=require("../controllers/ctrlInstructor")

const router=express.Router()

router.use(auth)
router.use(hasRole("instructor"))

router.post("/create-course",ctrlInstructor.createCourse)
module.exports=router