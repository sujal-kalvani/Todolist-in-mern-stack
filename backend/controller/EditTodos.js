const todoModel=require("../models/Todo")

async function editTodoController(req,res)
{
    try {
        const {id}=req.params

        const editTodo=await todoModel.findById(id);

        res.status(200).json(editTodo);

    } catch (error) {
        
        res.status(500).json(error)
    }
}

module.exports=editTodoController