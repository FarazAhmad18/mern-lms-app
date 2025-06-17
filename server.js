const express=require("express")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())

require("dotenv").config()

require("./config/database").dbConnect()
const port=process.env.PORT || 4000
const authRoutes=require("./routes/auth")
// const adminRoutes=require("./routes/adminRoutes")
const instructorRoutes=require('./routes/instructorRoutes')
const studentRoutes=require("./routes/studentRoutes")
app.use("/api/auth",authRoutes)
// app.use("/admin",adminRoutes)
app.use("/instructor",instructorRoutes)
app.use("/student",studentRoutes)
app.listen(port,()=>{
console.log(`Server started at port ${port}`)
})

app.get('/',(req,res)=>{
    res.send("API is running")
})