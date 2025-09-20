const todoModel=require("../models/Todo")

async function deleteController(req,res)
{
    try {
        const {id}=req.params

        const todo=await todoModel.findByIdAndDelete(id);
         
        if(todo)
        {
            res.status(200).json({message:"Todo Deleted successfully"})
        }
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
module.exports=deleteController