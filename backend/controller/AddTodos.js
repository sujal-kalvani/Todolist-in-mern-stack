const todoModel=require("../models/Todo")

async function todoController(req,res)
{
    try {
        const {title,isCompleted}=req.body;

        const newTodos=new todoModel({
            title,
            isCompleted
        })

        const saveTodos=await newTodos.save();

        res.status(201).json(saveTodos)
        
    } catch (error) {
        res.status(500).json({message:"Server Error"})   
    }
}
module.exports=todoController