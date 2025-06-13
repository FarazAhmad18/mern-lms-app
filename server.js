const express=require("express")
const app=express()
const cors=require("cors")

require("dotenv").config()

require("./config/database").dbConnect()
const port=process.env.PORT || 4000
app.use(express.json())
app.use(cors())

app.listen(port,()=>{
console.log(`Server started at port ${port}`)
})

app.get('/',(req,res)=>{
    res.send("API is running")
})