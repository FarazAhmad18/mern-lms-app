const express=require("express")
const router=express.Router()
const { registerValidator, loginValidator } = require("../validators/authValidators");
const { validationResult } = require("express-validator");

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const{register,login}=require("../controllers/authController")

router.post("/register",registerValidator,runValidation,register)
router.post("/login",loginValidator,runValidation,login)

module.exports=router;