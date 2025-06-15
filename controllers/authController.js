const User=require("../models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const sendToken=(user,res,msg)=>{
const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
res.status(200).json({
    success:true,
    msg,
    token,
    user:{
       name: user.name,
       email: user.email,
       role:user.role
    }
})
}
exports.register=async (req,res)=>{
try{const {name,email,role,password}=req.body;
const existing=await User.findOne({email})

if(existing) return res.status(400).json({
    success:false,
    message:"Email already registered"

})
const user=await User.create({name,email,role,password})
sendToken(user,res,"Registration Successful")
}
catch(err){
res.status(500).json({
    success:false,
    message:"server error"
})
}}


exports.login=async(req,res)=>{
try{
    const {email,password}=req.body;
    const user=await User.findOne({email})
    if(!user)return res.status(401).json({
        success:false,
        message:"Invalid Credintials",
    })
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(401).json({
        success:false,
        message:"Incorrect Password"
    })
    sendToken(user,res,"Login Successfull")
}
catch(err)
{
res.status(500).json({
    success:false,
    message:"Server Error"

})
}
}