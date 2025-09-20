const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            require:true,
            trim:true
        },
        isCompleted:{
            type:Boolean,
            default:false
        }
    }
)
const todoModel=mongoose.model("todo",todoSchema)
module.exports=todoModel