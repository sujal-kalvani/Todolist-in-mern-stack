const todoModel=require("../models/Todo")

async function getTodoController(req,res)
{
    try {
        const todos=await todoModel.find({})
        res.status(200).json(todos)

    } catch (error) {
    
        res.status(500).json({message:"Server Error"})   
    }
}
module.exports=getTodoController