const express=require("express")
const app=express()
// const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const connectDB=require('./config/mongodb')
const router=require("./routes")

dotenv.config()

app.get('/',(req,res)=>{
    res.send("hello world!")
})

app.use(cors({
    origin:process.env.frontendUrl,
    credentials:true
}));
app.use(express.json())
app.use('/api',router)

connectDB().then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`Server running on port ${process.env.port}`);
        console.log("Connected to db");
    })
})